import React, { useMemo, useState } from "react";

// DoubtStack – Single-file React conversion
// Styling: TailwindCSS utility classes
// Icons: simple emoji placeholders to match your markup
// Notes:
// - Replace emoji with lucide-react icons if you prefer
// - Hook up real backend later; state is mocked for demo

const initialPosts = [
  {
    id: 1,
    username: "@alex_cs",
    department: "Computer Science",
    time: "2 hours ago",
    type: "Question",
    title: "Help with Data Structures Assignment",
    content:
      "I'm struggling with implementing a binary search tree in C++. Can someone explain the insertion process step by step? I've been stuck on this for hours and the deadline is tomorrow.",
    tags: ["#DataStructures", "#CPlusPlus", "#Assignment"],
    votes: 12,
    downvotes: 1,
    comments: 8,
    saved: false,
  },
  {
    id: 2,
    username: "@priya_ece",
    department: "Electronics & Communication",
    time: "5 hours ago",
    type: "Answered",
    title: "Digital Signal Processing Lab Questions",
    content:
      "Can anyone share the solution for DSP Lab Exercise 3? I want to verify my approach for the FFT implementation. Also, which software is better - MATLAB or Python for signal processing?",
    tags: ["#DSP", "#MATLAB", "#Python", "#Lab"],
    votes: 25,
    downvotes: 0,
    comments: 15,
    saved: false,
  },
];

const activity = [
  {
    id: 1,
    type: "posts",
    icon: "📝",
    title: "React Hooks vs Class Components",
    time: "3 hours ago",
    stats: "12 votes • 5 comments",
  },
  { id: 2, type: "comments", icon: "💬", title: "JavaScript Array Methods", time: "5 hours ago", stats: "8 upvotes" },
  { id: 3, type: "votes", icon: "⬆️", title: "Machine Learning Basics", time: "1 day ago", stats: "by @sarah_ai" },
  {
    id: 4,
    type: "posts",
    icon: "📝",
    title: "Database Design Best Practices",
    time: "2 days ago",
    stats: "28 votes • 12 comments",
  },
];

const groupsSeed = [
  {
    id: 1,
    name: "Web Development Study Group",
    members: 24,
    posts: 156,
    topics: ["#HTML", "#CSS", "#JavaScript", "#React"],
    emoji: "🖥️",
    description:
      "Learn modern web technologies together! We cover HTML, CSS, JavaScript, React, and more.",
    status: "joined",
  },
  {
    id: 2,
    name: "Data Structures & Algorithms",
    members: 89,
    posts: 342,
    topics: ["#Arrays", "#LinkedLists", "#Trees", "#Graphs"],
    emoji: "🧮",
    description: "Master DSA concepts together! Daily problem-solving sessions and concept discussions.",
    status: "joined",
  },
  {
    id: 3,
    name: "Machine Learning Enthusiasts",
    members: 45,
    posts: 89,
    topics: ["#Python", "#TensorFlow", "#Pandas", "#ML"],
    emoji: "📊",
    description: "Explore ML algorithms, discuss research papers, and work on projects together.",
    status: "available",
  },
  {
    id: 4,
    name: "Mobile App Development",
    members: 32,
    posts: 67,
    topics: ["#ReactNative", "#Flutter", "#iOS", "#Android"],
    emoji: "📱",
    description: "Build amazing mobile apps! Focus on React Native, Flutter, and native development.",
    status: "available",
  },
];

const departmentPostsSeed = [
  {
    id: 101,
    dept: "cse",
    dtype: "faculty",
    headerUser: "Prof. Sarah Johnson",
    headerDept: "Computer Science - Faculty",
    time: "1 hour ago",
    postType: "Faculty Post",
    title: "Assignment 3 - Database Design Guidelines",
    content:
      "Students, please review the database normalization concepts before starting Assignment 3. I've uploaded additional resources to help you understand 3NF and BCNF. The deadline is extended to Friday due to technical issues with the server.",
    attachments: ["📄 Database_Normalization_Guide.pdf", "🎥 3NF_Tutorial_Video.mp4"],
    likes: 45,
    comments: 12,
    saved: false,
  },
  {
    id: 102,
    dept: "cse",
    dtype: "official",
    headerUser: "CS Department",
    headerDept: "Official Announcement",
    time: "3 hours ago",
    postType: "Announcement",
    title: "🎉 Coding Competition - TechFest 2024",
    content:
      "Attention all CS students! Our annual coding competition is scheduled for next month. Prize money worth $5000 to be won. Topics include algorithms, data structures, and web development challenges.",
    announcement: {
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      venue: "Computer Lab 3, Block A",
      prizes: "1st: $2000, 2nd: $1500, 3rd: $1000",
    },
    likes: 128,
    comments: 34,
    saved: false,
  },
  {
    id: 103,
    dept: "cse",
    dtype: "all",
    headerUser: "@mike_senior",
    headerDept: "Computer Science - Final Year",
    time: "6 hours ago",
    postType: "Project Help",
    title: "Final Year Project - Team Formation",
    content:
      "Looking for 2 more team members for a Machine Learning project focused on natural language processing. We have approval from Prof. Anderson and need people with Python/ML experience.",
    reqs: ["✅ Python programming", "✅ Machine Learning basics", "✅ Available for 6 months", "✅ Team player attitude"],
    likes: 23,
    comments: 18,
    saved: false,
  },
];

export default function DoubtStackHome() {
  const [activeSection, setActiveSection] = useState("home");
  const [posts, setPosts] = useState(initialPosts);
  const [query, setQuery] = useState("");
  const [recentFilter, setRecentFilter] = useState("all");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groups, setGroups] = useState(groupsSeed);
  const [groupsTab, setGroupsTab] = useState("joined");
  const [deptFilter, setDeptFilter] = useState("cse");
  const [deptType, setDeptType] = useState("all");
  const [departmentPosts, setDepartmentPosts] = useState(departmentPostsSeed);

  // Saved posts collection (from anywhere)
  const savedAll = useMemo(() => {
    const a = posts.filter((p) => p.saved).map((p) => ({
      id: `p-${p.id}`,
      type: "questions",
      title: p.title,
      source: p.username,
      when: "Saved just now",
      tags: p.tags,
    }));
    const b = departmentPosts.filter((p) => p.saved).map((p) => ({
      id: `d-${p.id}`,
      type: p.dtype === "official" ? "resources" : "discussions",
      title: p.title,
      source: p.headerUser,
      when: "Saved just now",
      tags: ["#Department"],
    }));
    return [...a, ...b];
  }, [posts, departmentPosts]);

  const filteredPosts = useMemo(() => {
    if (!query) return posts;
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [posts, query]);

  const filteredActivities = useMemo(() => {
    return activity.filter((a) => (recentFilter === "all" ? true : a.type === recentFilter));
  }, [recentFilter]);

  const visibleGroups = useMemo(() => {
    switch (groupsTab) {
      case "joined":
        return groups.filter((g) => g.status === "joined");
      case "available":
        return groups.filter((g) => g.status === "available");
      case "popular":
        return [...groups].sort((a, b) => b.members - a.members);
      default:
        return groups;
    }
  }, [groups, groupsTab]);

  const visibleDeptPosts = useMemo(() => {
    return departmentPosts.filter((p) => (deptFilter === "all" ? true : p.dept === deptFilter)).filter((p) => {
      if (deptType === "all") return true;
      if (deptType === "faculty") return p.dtype === "faculty";
      if (deptType === "official") return p.dtype === "official";
      return true;
    });
  }, [departmentPosts, deptFilter, deptType]);

  const vote = (postId, dir) => {
    setPosts((ps) =>
      ps.map((p) =>
        p.id === postId
          ? {
              ...p,
              votes: dir === "up" ? p.votes + 1 : p.votes,
              downvotes: dir === "down" ? p.downvotes + 1 : p.downvotes,
            }
          : p
      )
    );
  };

  const toggleSave = (kind, id) => {
    if (kind === "post") {
      setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)));
    } else if (kind === "dept") {
      setDepartmentPosts((ds) => ds.map((d) => (d.id === id ? { ...d, saved: !d.saved } : d)));
    }
  };

  const joinGroup = (id) => {
    setGroups((gs) => gs.map((g) => (g.id === id ? { ...g, status: "joined" } : g)));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("title");
    const content = form.get("content");
    const tags = String(form.get("tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const type = form.get("ptype") || "Question";

    const newPost = {
      id: Date.now(),
      username: "@you",
      department: "Computer Science",
      time: "just now",
      type,
      title,
      content,
      tags,
      votes: 0,
      downvotes: 0,
      comments: 0,
      saved: false,
    };
    setPosts((ps) => [newPost, ...ps]);
    setShowPostModal(false);
    e.currentTarget.reset();
    setActiveSection("home");
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("gname");
    const desc = form.get("gdesc");
    const newGroup = {
      id: Date.now(),
      name,
      description: desc,
      emoji: "👥",
      members: 1,
      posts: 0,
      topics: [],
      status: "joined",
    };
    setGroups((gs) => [newGroup, ...gs]);
    setShowGroupModal(false);
    e.currentTarget.reset();
    setActiveSection("groups");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-4 sticky top-0 hidden md:block">
          <h2 className="text-2xl font-bold mb-4">DoubtStack</h2>
          <nav className="flex flex-col gap-2">
            {[
              { id: "home", label: "🏠 Home" },
              { id: "recent", label: "🕐 Recent" },
              { id: "feed", label: "⚙️ Customize Feed" },
              { id: "groups", label: "👥 Study Groups" },
              { id: "department", label: "🏫 Department Posts" },
              { id: "saved", label: "⭐ Saved Posts" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={
                  "text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition " +
                  (activeSection === item.id ? "bg-gray-100 font-semibold" : "")
                }
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 border-t pt-4 flex flex-col gap-2">
            <button onClick={() => setActiveSection("profile")} className="text-left px-3 py-2 rounded-lg hover:bg-gray-100">👤 Profile</button>
            <a href="index.html" className="text-left px-3 py-2 rounded-lg hover:bg-gray-100">🚪 Logout</a>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Topbar */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between gap-4 p-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="🔍 Search posts, users, or topics..."
                className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring"
              />
              <div className="flex items-center gap-3 text-xl">
                <button title="Notifications" className="hover:scale-105">🔔</button>
                <button title="Create Post" onClick={() => setShowPostModal(true)} className="hover:scale-105">➕</button>
                <button title="Messages" className="hover:scale-105">💬</button>
                <button title="Profile" onClick={() => setActiveSection("profile")} className="hover:scale-105">👤</button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 max-w-6xl mx-auto">
            {/* Home Section */}
            {activeSection === "home" && (
              <section>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 border">
                  <h1 className="text-3xl font-bold mb-2">Welcome to DoubtStack! 👋</h1>
                  <p className="mb-4 text-gray-700">Ask questions, share knowledge, and connect with your classmates</p>
                  <button onClick={() => setShowPostModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Ask Your First Question</button>
                </div>

                <div className="space-y-4">
                  {filteredPosts.map((p) => (
                    <article key={p.id} className="bg-white rounded-2xl p-5 border shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <span className="font-medium text-gray-800">{p.username}</span>
                            <span>• {p.department}</span>
                            <span>• {p.time}</span>
                          </div>
                          <span className={"inline-block text-xs mt-1 px-2 py-0.5 rounded-full border " + (p.type === "Answered" ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200")}>
                            {p.type}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-xl font-semibold mt-3">{p.title}</h2>
                      <p className="text-gray-700 mt-2">{p.content}</p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {p.tags.map((t, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{t}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 mt-4 text-sm">
                        <button onClick={() => vote(p.id, "up")} className="px-2 py-1 rounded hover:bg-gray-100">⬆️ {p.votes}</button>
                        <button onClick={() => vote(p.id, "down")} className="px-2 py-1 rounded hover:bg-gray-100">⬇️ {p.downvotes}</button>
                        <button className="px-2 py-1 rounded hover:bg-gray-100">💬 {p.comments}</button>
                        <button onClick={() => toggleSave("post", p.id)} className="px-2 py-1 rounded hover:bg-gray-100">{p.saved ? "⭐ Saved" : "⭐ Save"}</button>
                        <button className="px-2 py-1 rounded hover:bg-gray-100">📤 Share</button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Recent Section */}
            {activeSection === "recent" && (
              <section>
                <header className="mb-6">
                  <h1 className="text-2xl font-bold">🕐 Recent Activity</h1>
                  <p className="text-gray-600">Your latest posts and interactions</p>
                </header>

                <div className="flex gap-2 mb-4 flex-wrap">
                  {["all", "posts", "comments", "votes"].map((k) => (
                    <button
                      key={k}
                      onClick={() => setRecentFilter(k)}
                      className={
                        "px-3 py-1.5 rounded-full border " +
                        (recentFilter === k ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50")
                      }
                    >
                      {k === "all" ? "All Activity" : `My ${k[0].toUpperCase() + k.slice(1)}`}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {filteredActivities.map((a) => (
                    <div key={a.id} className="flex items-start gap-3 bg-white border p-4 rounded-xl">
                      <div className="text-2xl">{a.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium">You {a.type === "votes" ? "upvoted" : a.type === "comments" ? "commented on" : "posted"} <strong>"{a.title}"</strong></div>
                        <div className="text-sm text-gray-500 flex gap-3 mt-1">
                          <span>{a.time}</span>
                          <span>{a.stats}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Customize Feed */}
            {activeSection === "feed" && (
              <section>
                <header className="mb-6">
                  <h1 className="text-2xl font-bold">⚙️ Customize Feed</h1>
                  <p className="text-gray-600">Personalize your content preferences</p>
                </header>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Subject Preferences */}
                  <div className="bg-white border rounded-2xl p-5">
                    <h3 className="text-lg font-semibold">📚 Subject Preferences</h3>
                    <p className="text-sm text-gray-600">Choose subjects you're interested in</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Computer Science", "Mathematics", "Physics", "Chemistry", "Electronics", "Mechanical"].map((s, i) => (
                        <label key={s} className="inline-flex items-center gap-2 bg-gray-50 border rounded-full px-3 py-1">
                          <input type="checkbox" defaultChecked={[0, 1, 4].includes(i)} />
                          <span className="text-sm">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Content Types */}
                  <div className="bg-white border rounded-2xl p-5">
                    <h3 className="text-lg font-semibold">📋 Content Types</h3>
                    <p className="text-sm text-gray-600">Select what type of content you want to see</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {[
                        ["❓ Questions", true],
                        ["💡 Discussions", true],
                        ["📖 Resources", true],
                        ["📢 Announcements", false],
                        ["💼 Project Help", true],
                      ].map(([label, chk]) => (
                        <label key={String(label)} className="inline-flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
                          <input type="checkbox" defaultChecked={chk as boolean} />
                          <span className="text-sm">{label as string}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Feed Settings */}
                  <div className="md:col-span-2 bg-white border rounded-2xl p-5">
                    <h3 className="text-lg font-semibold">🎚️ Feed Settings</h3>
                    <p className="text-sm text-gray-600">Adjust how your feed behaves</p>

                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <label htmlFor="sortBy" className="w-40 text-sm">Sort posts by:</label>
                        <select id="sortBy" className="border rounded-lg px-3 py-2 w-full">
                          <option value="recent">Most Recent</option>
                          <option value="popular">Most Popular</option>
                          <option value="unanswered">Unanswered First</option>
                          <option value="following">From People I Follow</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-3">
                        <label htmlFor="postAge" className="w-40 text-sm">Show posts from:</label>
                        <select id="postAge" className="border rounded-lg px-3 py-2 w-full">
                          <option value="all">All Time</option>
                          <option value="week">Last Week</option>
                          <option value="month">Last Month</option>
                          <option value="today">Today Only</option>
                        </select>
                      </div>

                      <label className="inline-flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Show notifications for followed topics</span>
                      </label>
                      <label className="inline-flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
                        <input type="checkbox" />
                        <span className="text-sm">Hide posts I've already voted on</span>
                      </label>
                    </div>

                    <div className="mt-4">
                      <button className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-black">💾 Save Preferences</button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Groups Section */}
            {activeSection === "groups" && (
              <section>
                <header className="mb-6 flex items-center justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">👥 Study Groups</h1>
                    <p className="text-gray-600">Join or create study groups with your classmates</p>
                  </div>
                  <button onClick={() => setShowGroupModal(true)} className="px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">➕ Create New Group</button>
                </header>

                <div className="flex gap-2 mb-4 flex-wrap">
                  {[
                    ["joined", "My Groups"],
                    ["available", "Available Groups"],
                    ["popular", "Popular Groups"],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setGroupsTab(key as string)}
                      className={
                        "px-3 py-1.5 rounded-full border " +
                        (groupsTab === key ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50")
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {visibleGroups.map((g) => (
                    <div key={g.id} className="bg-white border rounded-2xl p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{g.emoji}</div>
                          <div>
                            <h3 className="text-lg font-semibold">{g.name}</h3>
                            <p className="text-sm text-gray-600">{g.members} members • {g.posts} posts</p>
                          </div>
                        </div>
                        <div className={"text-xs px-2 py-1 rounded-full border " + (g.status === "joined" ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200")}>{g.status === "joined" ? "Joined" : "Join"}</div>
                      </div>

                      <p className="text-gray-700 mt-3">{g.description}</p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {g.topics.map((t) => (
                          <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{t}</span>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-4">
                        {g.status === "available" ? (
                          <button onClick={() => joinGroup(g.id)} className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">🚪 Join Group</button>
                        ) : (
                          <button className="px-3 py-2 bg-gray-900 text-white rounded-lg">💬 View Posts</button>
                        )}
                        <button className="px-3 py-2 bg-gray-100 rounded-lg">⚙️ Settings</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Department Section */}
            {activeSection === "department" && (
              <section>
                <header className="mb-6">
                  <h1 className="text-2xl font-bold">🏫 Department Posts</h1>
                  <p className="text-gray-600">Posts from your department and faculty</p>
                </header>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <select
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="all">All Departments</option>
                    <option value="cse">Computer Science & Engineering</option>
                    <option value="ece">Electronics & Communication</option>
                    <option value="eee">Electrical Engineering</option>
                    <option value="mech">Mechanical Engineering</option>
                    <option value="civil">Civil Engineering</option>
                  </select>

                  {[
                    ["all", "All Posts"],
                    ["faculty", "Faculty Posts"],
                    ["official", "Official Announcements"],
                  ].map(([k, label]) => (
                    <button
                      key={k}
                      onClick={() => setDeptType(k as string)}
                      className={
                        "px-3 py-1.5 rounded-full border " +
                        (deptType === k ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50")
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {visibleDeptPosts.map((p) => (
                    <article key={p.id} className="bg-white border rounded-2xl p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <span className="font-medium text-gray-800">{p.headerUser}</span>
                            <span>• {p.headerDept}</span>
                            <span>• {p.time}</span>
                          </div>
                          <span className={"inline-block text-xs mt-1 px-2 py-0.5 rounded-full border " + (p.dtype === "official" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : p.dtype === "faculty" ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-blue-50 text-blue-700 border-blue-200")}>
                            {p.postType}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-xl font-semibold mt-3">{p.title}</h2>
                      <p className="text-gray-700 mt-2">{p.content}</p>

                      {p.attachments && (
                        <div className="mt-3 grid md:grid-cols-2 gap-2">
                          {p.attachments.map((a, i) => (
                            <div key={i} className="bg-gray-50 border rounded-lg px-3 py-2">{a}</div>
                          ))}
                        </div>
                      )}

                      {p.announcement && (
                        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                          <div className="bg-gray-50 border rounded-lg px-3 py-2">📅 <strong>Date:</strong> {p.announcement.date}</div>
                          <div className="bg-gray-50 border rounded-lg px-3 py-2">🕐 <strong>Time:</strong> {p.announcement.time}</div>
                          <div className="bg-gray-50 border rounded-lg px-3 py-2">📍 <strong>Venue:</strong> {p.announcement.venue}</div>
                          <div className="bg-gray-50 border rounded-lg px-3 py-2">💰 <strong>Prizes:</strong> {p.announcement.prizes}</div>
                        </div>
                      )}

                      {p.reqs && (
                        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                          {p.reqs.map((r, i) => (
                            <div key={i} className="bg-gray-50 border rounded-lg px-3 py-2">{r}</div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 mt-4 text-sm">
                        <button className="px-2 py-1 rounded hover:bg-gray-100">👍 {p.likes}</button>
                        <button className="px-2 py-1 rounded hover:bg-gray-100">💬 {p.comments}</button>
                        <button onClick={() => toggleSave("dept", p.id)} className="px-2 py-1 rounded hover:bg-gray-100">{p.saved ? "⭐ Saved" : "⭐ Save"}</button>
                        <button className="px-2 py-1 rounded hover:bg-gray-100">📤 Share</button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Saved Section */}
            {activeSection === "saved" && (
              <section>
                <header className="mb-6">
                  <h1 className="text-2xl font-bold">⭐ Saved Posts</h1>
                  <p className="text-gray-600">Your bookmarked posts for later reference</p>
                </header>

                <div className="flex gap-2 mb-4 flex-wrap">
                  {[
                    ["all", "All Saved"],
                    ["questions", "Questions"],
                    ["resources", "Resources"],
                    ["discussions", "Discussions"],
                  ].map(([k, label]) => (
                    <button key={k} className="px-3 py-1.5 rounded-full border bg-white hover:bg-gray-50">{label}</button>
                  ))}
                </div>

                {savedAll.length === 0 ? (
                  <div className="text-center bg-white border rounded-2xl p-8">
                    <div className="text-5xl">📚</div>
                    <h3 className="text-xl font-semibold mt-2">No saved posts yet</h3>
                    <p className="text-gray-600">Start saving posts by clicking the ⭐ button on any post</p>
                    <button onClick={() => setActiveSection("home")} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl">Browse Posts</button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {savedAll.map((s) => (
                      <div key={s.id} className="bg-white border rounded-2xl p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{s.title}</h3>
                            <p className="text-sm text-gray-600">{s.when} from {s.source}</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-2 py-1 rounded hover:bg-gray-100">🗑️</button>
                            <button className="px-2 py-1 rounded hover:bg-gray-100">👁️</button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {s.tags.map((t) => (
                            <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Profile Section */}
            {activeSection === "profile" && (
              <section>
                <div className="bg-white border rounded-2xl p-5 max-w-xl">
                  <h2 className="text-xl font-semibold">Your Profile</h2>
                  <div className="mt-3 space-y-1 text-sm">
                    <p><strong>Username:</strong> student123</p>
                    <p><strong>Department:</strong> Computer Science</p>
                    <p><strong>Year:</strong> 3rd Year</p>
                    <p><strong>Posts:</strong> 5</p>
                    <p><strong>Reputation:</strong> 120 points</p>
                  </div>
                  <button className="mt-4 px-3 py-2 bg-gray-900 text-white rounded-xl">Edit Profile</button>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>

      {/* Create Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center z-20" role="dialog" aria-modal>
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Create New Post</h2>
              <button onClick={() => setShowPostModal(false)} className="text-2xl leading-none">×</button>
            </div>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input name="title" required placeholder="What's your question or topic?" className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea name="content" required rows={5} placeholder="Provide more details about your question..." className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Tags (comma-separated)</label>
                <input name="tags" placeholder="e.g., JavaScript, React, Assignment" className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Post Type</label>
                <select name="ptype" required className="mt-1 w-full border rounded-lg px-3 py-2">
                  <option value="">Select type</option>
                  <option value="Question">Question</option>
                  <option value="Discussion">Discussion</option>
                  <option value="Resource">Resource Share</option>
                  <option value="Announcement">Announcement</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowPostModal(false)} className="px-4 py-2 rounded-xl border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white">Post Question</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center z-20" role="dialog" aria-modal>
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Create Study Group</h2>
              <button onClick={() => setShowGroupModal(false)} className="text-2xl leading-none">×</button>
            </div>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Group Name</label>
                <input name="gname" required placeholder="e.g., Web Development Study Group" className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea name="gdesc" rows={4} placeholder="What is this group about?" className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowGroupModal(false)} className="px-4 py-2 rounded-xl border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white">Create Group</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
