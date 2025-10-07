export const mockUsers = [
  {
    id: 1,
    username: "alex_cs",
    email: "alex@university.edu",
    department: "Computer Science",
    year: "3rd Year",
    bio: "Passionate about algorithms and data structures",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    reputation: 245
  },
  {
    id: 2,
    username: "priya_ece",
    email: "priya@university.edu",
    department: "Electronics",
    year: "2nd Year",
    bio: "DSP and MATLAB enthusiast",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    reputation: 180
  }
];

export const mockPosts = [
  {
    id: 1,
    userId: 1,
    username: "@alex_cs",
    department: "Computer Science",
    time: "2 hours ago",
    type: "Question",
    title: "Help with Data Structures Assignment",
    content: "I'm struggling with implementing a binary search tree in C++. Can someone explain the insertion logic and how to maintain balance?",
    tags: ["DataStructures", "CPlusPlus", "Assignment"],
    votes: 12,
    comments: 8,
    viewCount: 156,
    saved: false
  },
  {
    id: 2,
    userId: 2,
    username: "@priya_ece",
    department: "Electronics",
    time: "5 hours ago",
    type: "Answered",
    title: "Digital Signal Processing Lab Questions",
    content: "Can anyone share the solution for DSP Lab Exercise 3? I'm having trouble with the FFT implementation in MATLAB.",
    tags: ["DSP", "MATLAB", "Python", "Lab"],
    votes: 25,
    comments: 15,
    viewCount: 342,
    saved: false
  },
  {
    id: 3,
    userId: 1,
    username: "@alex_cs",
    department: "Computer Science",
    time: "1 day ago",
    type: "Discussion",
    title: "Best Resources for Learning React Hooks",
    content: "What are the best online resources to master React Hooks? I'm looking for comprehensive tutorials and practice projects.",
    tags: ["React", "JavaScript", "WebDev"],
    votes: 8,
    comments: 12,
    viewCount: 203,
    saved: false
  }
];

export const mockComments = {
  1: [
    {
      id: 1,
      userId: 2,
      username: "@priya_ece",
      content: "You should start by understanding the basic structure. Each node has left and right children.",
      time: "1 hour ago",
      votes: 5
    },
    {
      id: 2,
      userId: 1,
      username: "@john_doe",
      content: "Check out this video tutorial, it helped me a lot: [link]",
      time: "30 minutes ago",
      votes: 3
    }
  ],
  2: [
    {
      id: 3,
      userId: 1,
      username: "@alex_cs",
      content: "I have the solution. Let me share the key steps...",
      time: "4 hours ago",
      votes: 8
    }
  ]
};

export const mockNotifications = [
  {
    id: 1,
    type: "comment",
    message: "@priya_ece commented on your post",
    time: "1 hour ago",
    read: false
  },
  {
    id: 2,
    type: "vote",
    message: "Your post received 5 new upvotes",
    time: "3 hours ago",
    read: false
  },
  {
    id: 3,
    type: "answer",
    message: "Your question was marked as answered",
    time: "1 day ago",
    read: true
  }
];
