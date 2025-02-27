"use client";
import { useEffect, useState } from "react";
import { TypeWriter } from "./TypeWriter";
import { motion } from "framer-motion";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai"; // 👁️ Eye icon for views
import DOMPurify from "dompurify"; // Import DOMPurify for sanitization
import { supabase } from "@/lib/supabase"; // ✅ Correct: Use named import

const MAX_COMMENT_LENGTH = 200; // Limit comment length

export default function PoemDisplay({ title, content, slug }: { title: string; content: string; slug: string }) {
  const lines = content.split("\n").filter((line) => line.trim() !== "");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [ip, setIp] = useState<string | null>(null); // Store user's IP
  const [views, setViews] = useState(0);


  /** ✅ Fetch User IP */
  useEffect(() => {
    async function fetchUserIP() {
      try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        setIp(data.ip);
      } catch (error) {
        console.error("❌ Failed to get IP:", error);
      }
    }
    fetchUserIP();
  }, []);

  /** ✅ Fetch Likes & Comments from Supabase on mount */
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("poems")
        .select("likes, comments")
        .eq("slug", slug)
        .maybeSingle();
  
      if (error) {
        console.error("❌ Supabase fetch error:", error.message);
        return;
      }
  
      if (!data) {
        console.warn("⚠️ No matching row for slug:", slug);
        return;
      }
  
      setLikes(data.likes || 0);
      setComments(data.comments || []);
    }
  
    // Check if this poem has already been viewed in this session
    const hasPlayed = sessionStorage.getItem(`poemPlayed-${slug}`);
    if (hasPlayed) {
      setCurrentLineIndex(lines.length - 1); // Show full poem immediately
      setIsFinished(true);
    } else {
      sessionStorage.setItem(`poemPlayed-${slug}`, "true"); // Mark as played
    }
  
    fetchData();
  }, [slug]);

  useEffect(() => {
    async function updateViews() {
      const { data, error } = await supabase
        .from("poems")
        .select("views")
        .eq("slug", slug)
        .maybeSingle();
  
      if (error) {
        console.error("❌ Supabase fetch error:", error.message);
        return;
      }
  
      if (data) {
        const newViews = (data.views || 0) + 1;
        setViews(newViews); // ✅ Update state with new view count
  
        await supabase
          .from("poems")
          .update({ views: newViews })
          .eq("slug", slug);
      }
    }
  
    updateViews();
  }, [slug]);
  
  
  /** ✅ Function to validate comments */
  function validateComment(input: string) {
    const trimmed = input.trim();
    if (trimmed.length === 0) return { valid: false, error: "Comment cannot be empty." };
    if (trimmed.length > MAX_COMMENT_LENGTH) return { valid: false, error: "Comment is too long." };
    if (comments.includes(trimmed)) return { valid: false, error: "Duplicate comments are not allowed." };
    return { valid: true, error: null };
  }

  /** ✅ Function to sanitize input before storing/displaying */
  function sanitizeInput(input: string) {
    return DOMPurify.sanitize(input);
  }

  /** ✅ Handle Like Button Click (One Like Per IP) */
  async function handleLike() {
    if (!ip) return;

    // Check if IP already liked this poem
    const { data: existingLike } = await supabase
      .from("likes")
      .select("ip_address")
      .eq("slug", slug)
      .eq("ip_address", ip)
      .maybeSingle();


    if (existingLike) {
      console.warn("⚠️ This IP has already liked the poem.");
      return;
    }

    // Update likes in database
    const newLikes = likes + 1;
    setLikes(newLikes);
    setLiked(true);

    // Insert like record for this IP
    const { error } = await supabase
      .from("likes")
      .insert([{ slug, ip_address: ip }]);

    if (error) console.error("❌ Error updating likes:", error.message);
  }

  /** ✅ Handle Comment Submission (One Comment Per IP) */
  async function handleComment() {
    if (!ip || !comment.trim()) return;

    // Check if IP has already commented
    const { data: existingComment } = await supabase
      .from("comments")
      .select("ip_address")
      .eq("slug", slug)
      .eq("ip_address", ip)
      .maybeSingle();
  

    if (existingComment) {
      console.warn("⚠️ This IP has already commented.");
      return;
    }

    const validation = validateComment(comment);
    if (!validation.valid) {
      alert(validation.error); // Show error if validation fails
      return;
    }

    const sanitizedComment = sanitizeInput(comment);
    const newComments = [...comments, sanitizedComment];
    setComments(newComments);
    setComment("");

    // Insert comment record
    const { error } = await supabase
      .from("comments")
      .insert([{ slug, ip_address: ip, text: sanitizedComment }]);

    if (error) console.error("❌ Error updating comments:", error.message);
  }

  /** ✅ Handle Poem Typing Effect */
  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const delay = 1000 + lines[currentLineIndex].length * 50;
      const timer = setTimeout(() => setCurrentLineIndex(currentLineIndex + 1), delay);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setIsFinished(true), 500);
    }
  }, [currentLineIndex, lines.length]); // ✅ Add `lines.length` to the dependency array
  

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      {/* Title */}
      <h1 className="text-3xl mt-16 mb-4">
        <TypeWriter words={[title]} loop={1} cursor cursorStyle="_" />
      </h1>

      {/* Poem Content */}
      <div className="text-lg max-w-2xl text-left">
        {lines.slice(0, currentLineIndex + 1).map((line, index) => (
          <p key={index} className="mb-2">
            <TypeWriter words={[line]} loop={1} typeSpeed={50} cursor={false} />
          </p>
        ))}
      </div>

      {/* Instagram-Like Section (Revealed After Typing) */}
      {isFinished && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 w-full max-w-md text-left"
        >
          {/* Likes Section with Heart Toggle */}
          <div className="flex items-center space-x-2 mb-2">
            <button onClick={handleLike} className="focus:outline-none" disabled={liked}>
              {liked ? (
                <AiFillHeart className="text-red-600 text-2xl" />
              ) : (
                <AiOutlineHeart className="text-2xl text-gray-400 hover:text-gray-200 transition" />
              )}
            </button>
            <p className="text-sm font-semibold">{likes.toLocaleString()} likes</p>

          </div>
          
          {/* Views Section */}
          <div className="flex items-center space-x-2 mt-2 text-gray-400">
            <AiOutlineEye className="text-xl" /> {/* 👁️ Eye Icon */}
            <p className="text-sm font-semibold">{views.toLocaleString()} views</p>
          </div>

          {/* Comments Section */}
          {comments.length > 3 && !showAllComments && (
            <p className="text-sm text-gray-400 cursor-pointer mb-2 hover:underline" onClick={() => setShowAllComments(true)}>
              View all {comments.length} comments
            </p>
          )}

          {/* Render comments */}
          <div className="space-y-1">
            {(showAllComments ? comments : comments.slice(-3)).map((cmt, idx) => (
              <p key={idx} className="text-sm">
                <span className="font-semibold">user{idx + 1}</span>{" "}
                <span dangerouslySetInnerHTML={{ __html: sanitizeInput(cmt) }} />
              </p>
            ))}
          </div>

          {/* ✅ Add this missing comment input box */}
          <div className="mt-3 flex items-center border-t border-gray-600 pt-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-grow text-sm bg-transparent outline-none text-white placeholder-gray-400"
            />
            <button onClick={handleComment} className="text-blue-500 text-sm font-semibold hover:text-blue-400 transition">
              Post
            </button>
          </div>
        </motion.div>
      )}
    </main>
  );
}
