import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockPosts, mockNotifications, mockUsers } from '../utils/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      setPosts(mockPosts);
    }

    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      setNotifications(mockNotifications);
    }

    const storedSavedPosts = localStorage.getItem('savedPosts');
    if (storedSavedPosts) {
      setSavedPosts(JSON.parse(storedSavedPosts));
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }, [posts]);

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }, [savedPosts]);

  const login = (username, email) => {
    const user = {
      id: Date.now(),
      username,
      email,
      department: "Computer Science",
      year: "3rd Year",
      bio: "New user",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      reputation: 0
    };
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const createPost = (postData) => {
    const newPost = {
      id: Date.now(),
      userId: currentUser?.id || 1,
      username: `@${currentUser?.username || 'anonymous'}`,
      department: currentUser?.department || 'General',
      time: 'Just now',
      type: postData.type,
      title: postData.title,
      content: postData.content,
      tags: postData.tags,
      votes: 0,
      comments: 0,
      viewCount: 0,
      saved: false
    };
    setPosts([newPost, ...posts]);
    return newPost;
  };

  const updatePost = (postId, updates) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, ...updates } : post
    ));
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const votePost = (postId, direction) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          votes: direction === 'up' ? post.votes + 1 : post.votes - 1
        };
      }
      return post;
    }));
  };

  const toggleSavePost = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      time: 'Just now',
      read: false
    };
    setNotifications([newNotification, ...notifications]);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const updateUserProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const value = {
    currentUser,
    posts,
    notifications,
    savedPosts,
    login,
    logout,
    createPost,
    updatePost,
    deletePost,
    votePost,
    toggleSavePost,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    updateUserProfile
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
