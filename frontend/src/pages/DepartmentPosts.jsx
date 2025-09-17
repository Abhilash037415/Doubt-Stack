import React, { useState } from "react";

const DepartmentPosts = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("cse");
  const [activeFilter, setActiveFilter] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProfileClick = () => {
    // Handle profile navigation
    console.log("Navigate to profile");
  };

  return (
    <div className="home-page" style={styles.homePage}>
      {/* Sidebar */}
      <div className="sidebar" style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>DoubtStack</h2>
        <nav style={styles.nav}>
          <a href="/home" className="nav-link" style={styles.navLink}>🏠 Home</a>
          <a href="/recent" className="nav-link" style={styles.navLink}>🕐 Recent</a>
          <a href="/customize-feed" className="nav-link" style={styles.navLink}>⚙️ Customize Feed</a>
          <a href="/study-groups" className="nav-link" style={styles.navLink}>👥 Study Groups</a>
          <a href="/department-posts" className="nav-link active" style={{...styles.navLink, ...styles.activeNavLink}}>🏫 Department Posts</a>
          <a href="/saved-posts" className="nav-link" style={styles.navLink}>⭐ Saved Posts</a>
        </nav>
        <div className="sidebar-footer" style={styles.sidebarFooter}>
          <a href="/profile" className="nav-link" style={styles.navLink}>👤 Profile</a>
          <a href="/" className="nav-link logout" style={{...styles.navLink, ...styles.logoutLink}}>🚪 Logout</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content" style={styles.mainContent}>
        {/* Topbar */}
        <div className="topbar" style={styles.topbar}>
          <input
            type="text"
            placeholder="🔍 Search department posts..."
            className="search-bar"
            style={styles.searchBar}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="top-icons" style={styles.topIcons}>
            <span title="Notifications" style={styles.topIcon}>🔔</span>
            <span title="Create Post" style={styles.topIcon}>➕</span>
            <span title="Messages" style={styles.topIcon}>💬</span>
            <span 
              title="Profile" 
              onClick={handleProfileClick}
              style={{...styles.topIcon, cursor: 'pointer'}}
            >
              👤
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area" style={styles.contentArea}>
          {/* Section Header */}
          <div className="section-header" style={styles.sectionHeader}>
            <h1 style={styles.sectionTitle}>🏫 Department Posts</h1>
            <p style={styles.sectionDescription}>Posts from your department, faculty, and official announcements</p>
            <div className="department-info" style={styles.departmentInfo}>
              <div className="current-dept" style={styles.currentDept}>
                <span className="dept-icon" style={styles.deptIcon}>💻</span>
                <div className="dept-details" style={styles.deptDetails}>
                  <span className="dept-name" style={styles.deptName}>Computer Science & Engineering</span>
                  <span className="dept-stats" style={styles.deptStats}>
                    1,247 posts • 89 faculty • 456 students
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Department Filter */}
          <div className="department-filter" style={styles.departmentFilter}>
            <div className="filter-section" style={styles.filterSection}>
              <label htmlFor="departmentSelect" style={styles.filterLabel}>Department:</label>
              <select 
                id="departmentSelect" 
                value={selectedDepartment} 
                onChange={handleDepartmentChange}
                style={styles.departmentSelect}
              >
                <option value="all">All Departments</option>
                <option value="cse">Computer Science & Engineering</option>
                <option value="ece">Electronics & Communication</option>
                <option value="eee">Electrical Engineering</option>
                <option value="mech">Mechanical Engineering</option>
                <option value="civil">Civil Engineering</option>
                <option value="it">Information Technology</option>
                <option value="ai">Artificial Intelligence & ML</option>
              </select>
            </div>
            <div className="post-type-filters" style={styles.postTypeFilters}>
              {["All Posts", "Faculty Posts", "Official", "Student Posts", "Urgent"].map(filter => (
                <button 
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => handleFilterClick(filter)}
                  style={activeFilter === filter ? {...styles.filterBtn, ...styles.activeFilterBtn} : styles.filterBtn}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="dept-stats" style={styles.deptStatsGrid}>
            <div className="stat-item" style={styles.statItem}>
              <span className="stat-number" style={styles.statNumber}>23</span>
              <span className="stat-label" style={styles.statLabel}>New Posts Today</span>
            </div>
            <div className="stat-item" style={styles.statItem}>
              <span className="stat-number" style={styles.statNumber}>5</span>
              <span className="stat-label" style={styles.statLabel}>Faculty Announcements</span>
            </div>
            <div className="stat-item" style={styles.statItem}>
              <span className="stat-number" style={styles.statNumber}>12</span>
              <span className="stat-label" style={styles.statLabel}>Assignment Updates</span>
            </div>
            <div className="stat-item" style={styles.statItem}>
              <span className="stat-number" style={styles.statNumber}>8</span>
              <span className="stat-label" style={styles.statLabel}>Event Notices</span>
            </div>
          </div>

          {/* Department Posts */}
          <div className="department-posts" style={styles.departmentPosts}>
            {/* Urgent Official Post */}
            <div className="post department-post urgent-post" style={{...styles.post, ...styles.urgentPost}}>
              <div className="post-header" style={styles.postHeader}>
                <div className="user-info" style={styles.userInfo}>
                  <span className="username" style={styles.username}>CS Department Office</span>
                  <span className="department" style={styles.department}>Official - Computer Science</span>
                  <span className="time" style={styles.time}>30 minutes ago</span>
                </div>
                <div className="post-type urgent" style={{...styles.postType, ...styles.urgentType}}>🚨 URGENT</div>
              </div>
              <h2 style={styles.postTitle}>⚠️ System Maintenance - Lab Access Temporarily Unavailable</h2>
              <p style={styles.postContent}>
                <strong>NOTICE:</strong> All computer labs will be temporarily
                unavailable from 2:00 PM to 6:00 PM today due to network
                infrastructure upgrades. Students with scheduled lab sessions
                during this time should check with their course instructors for
                alternative arrangements.
              </p>
              <div className="announcement-details" style={styles.announcementDetails}>
                <div className="detail-item" style={styles.detailItem}>
                  📅 <strong>Date:</strong> Today, March 15, 2024
                </div>
                <div className="detail-item" style={styles.detailItem}>
                  🕐 <strong>Duration:</strong> 2:00 PM - 6:00 PM
                </div>
                <div className="detail-item" style={styles.detailItem}>
                  🏢 <strong>Affected:</strong> All Computer Labs (A, B, C blocks)
                </div>
                <div className="detail-item" style={styles.detailItem}>
                  📧 <strong>Contact:</strong>{" "}
                  <a href="mailto:lab-support@university.edu" style={styles.link}>
                    lab-support@university.edu
                  </a>
                </div>
              </div>
              <div className="post-actions" style={styles.postActions}>
                <span className="action upvote" style={styles.action}>👍 45</span>
                <span className="action comment" style={styles.action}>💬 12</span>
                <span className="action save" style={styles.action}>⭐ Save</span>
                <span className="action share" style={styles.action}>📤 Share</span>
              </div>
            </div>

            {/* Faculty Post */}
            <div className="post department-post" style={styles.post}>
              <div className="post-header" style={styles.postHeader}>
                <div className="user-info" style={styles.userInfo}>
                  <div className="faculty-avatar" style={styles.facultyAvatar}>👨‍🏫</div>
                  <div className="faculty-info" style={styles.facultyInfo}>
                    <span className="username" style={styles.username}>Prof. Sarah Johnson</span>
                    <span className="faculty-title" style={styles.facultyTitle}>Associate Professor</span>
                    <span className="department" style={styles.department}>
                      Computer Science - Database Systems
                    </span>
                    <span className="time" style={styles.time}>2 hours ago</span>
                  </div>
                </div>
                <div className="post-type faculty" style={{...styles.postType, ...styles.facultyType}}>Faculty Post</div>
              </div>
              <h2 style={styles.postTitle}>
                📚 Assignment 3 - Database Design Guidelines & Deadline Extension
              </h2>
              <p style={styles.postContent}>
                Dear students, please review the database normalization concepts
                before starting Assignment 3. I've uploaded additional resources
                to help you understand 3NF and BCNF better. Due to technical
                issues with the server last week, the deadline has been extended
                to <strong>Friday, March 22</strong>.
              </p>
              <div className="post-content" style={styles.postContentSection}>
                <h4 style={styles.resourcesTitle}>📖 New Resources Added:</h4>
                <ul style={styles.resourcesList}>
                  <li>Database Normalization Step-by-Step Guide</li>
                  <li>Video Tutorial: 3NF vs BCNF with Examples</li>
                  <li>Practice Problems with Solutions</li>
                  <li>ERD to Relational Schema Conversion Guide</li>
                </ul>
              </div>
              <div className="post-attachments" style={styles.postAttachments}>
                <div className="attachment" style={styles.attachment}>
                  📄 Database_Normalization_Guide.pdf
                  <button className="download-btn" style={styles.downloadBtn}>⬇️</button>
                </div>
                <div className="attachment" style={styles.attachment}>
                  🎥 3NF_Tutorial_Video.mp4
                  <button className="download-btn" style={styles.downloadBtn}>⬇️</button>
                </div>
                <div className="attachment" style={styles.attachment}>
                  📊 Practice_Problems.xlsx
                  <button className="download-btn" style={styles.downloadBtn}>⬇️</button>
                </div>
              </div>
              <div className="assignment-info" style={styles.assignmentInfo}>
                <div className="info-item" style={styles.infoItem}>
                  📅 <strong>New Deadline:</strong> Friday, March 22, 2024 - 11:59 PM
                </div>
                <div className="info-item" style={styles.infoItem}>
                  📍 <strong>Submission:</strong> University Portal - Assignment Section
                </div>
                <div className="info-item" style={styles.infoItem}>
                  📧 <strong>Questions:</strong> Office hours Tue/Thu 2-4 PM or email
                </div>
              </div>
              <div className="post-actions" style={styles.postActions}>
                <span className="action upvote" style={styles.action}>👍 67</span>
                <span className="action comment" style={styles.action}>💬 23</span>
                <span className="action save" style={styles.action}>⭐ Save</span>
                <span className="action share" style={styles.action}>📤 Share</span>
              </div>
            </div>

            {/* Official Announcement */}
            <div className="post department-post" style={styles.post}>
              <div className="post-header" style={styles.postHeader}>
                <div className="user-info" style={styles.userInfo}>
                  <div className="official-badge" style={styles.officialBadge}>🏛️</div>
                  <div className="official-info" style={styles.officialInfo}>
                    <span className="username" style={styles.username}>CS Department</span>
                    <span className="department" style={styles.department}>Official Announcement</span>
                    <span className="time" style={styles.time}>5 hours ago</span>
                  </div>
                </div>
                <div className="post-type official" style={{...styles.postType, ...styles.officialType}}>Announcement</div>
              </div>
              <h2 style={styles.postTitle}>
                🎉 TechFest 2024 - Annual Coding Competition & Tech Exhibition
              </h2>
              <p style={styles.postContent}>
                We're excited to announce our biggest tech event of the year!
                TechFest 2024 will feature coding competitions, project
                exhibitions, tech talks, and networking opportunities with
                industry professionals.
              </p>
              <div className="event-highlights" style={styles.eventHighlights}>
                <div className="highlight-grid" style={styles.highlightGrid}>
                  <div className="highlight-item" style={styles.highlightItem}>
                    <span className="highlight-icon" style={styles.highlightIcon}>💡</span>
                    <span className="highlight-label" style={styles.highlightLabel}>Innovative Projects</span>
                  </div>
                  <div className="highlight-item" style={styles.highlightItem}>
                    <span className="highlight-icon" style={styles.highlightIcon}>👨‍💻</span>
                    <span className="highlight-label" style={styles.highlightLabel}>Live Coding</span>
                  </div>
                  <div className="highlight-item" style={styles.highlightItem}>
                    <span className="highlight-icon" style={styles.highlightIcon}>🎤</span>
                    <span className="highlight-label" style={styles.highlightLabel}>Industry Talks</span>
                  </div>
                  <div className="highlight-item" style={styles.highlightItem}>
                    <span className="highlight-icon" style={styles.highlightIcon}>🤝</span>
                    <span className="highlight-label" style={styles.highlightLabel}>Networking</span>
                  </div>
                </div>
              </div>
              <div className="event-info" style={styles.eventInfo}>
                <div className="info-item" style={styles.infoItem}>
                  📅 <strong>Date:</strong> March 30 - April 2, 2024
                </div>
                <div className="info-item" style={styles.infoItem}>
                  📍 <strong>Location:</strong> Main Auditorium & Labs
                </div>
                <div className="info-item" style={styles.infoItem}>
                  🔗 <strong>Register:</strong>{" "}
                  <a href="#" style={styles.link}>Event Registration Portal</a>
                </div>
              </div>
              <div className="post-actions" style={styles.postActions}>
                <span className="action upvote" style={styles.action}>👍 102</span>
                <span className="action comment" style={styles.action}>💬 45</span>
                <span className="action save" style={styles.action}>⭐ Save</span>
                <span className="action share" style={styles.action}>📤 Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  homePage: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#3498db'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  navLink: {
    color: '#bdc3c7',
    textDecoration: 'none',
    padding: '12px 16px',
    borderRadius: '8px',
    margin: '4px 0',
    transition: 'all 0.3s ease'
  },
  activeNavLink: {
    backgroundColor: '#3498db',
    color: 'white'
  },
  sidebarFooter: {
    marginTop: 'auto'
  },
  logoutLink: {
    color: '#e74c3c'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  topbar: {
    backgroundColor: 'white',
    padding: '16px 24px',
    borderBottom: '1px solid #e1e8ed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchBar: {
    flex: 1,
    maxWidth: '400px',
    padding: '10px 16px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    fontSize: '14px',
    outline: 'none'
  },
  topIcons: {
    display: 'flex',
    gap: '16px'
  },
  topIcon: {
    fontSize: '18px',
    padding: '8px',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease'
  },
  contentArea: {
    flex: 1,
    padding: '24px',
    overflow: 'auto'
  },
  sectionHeader: {
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '8px'
  },
  sectionDescription: {
    color: '#7f8c8d',
    fontSize: '16px',
    marginBottom: '16px'
  },
  departmentInfo: {
    marginBottom: '20px'
  },
  currentDept: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#e8f4fd',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #3498db'
  },
  deptIcon: {
    fontSize: '24px',
    marginRight: '12px'
  },
  deptDetails: {
    display: 'flex',
    flexDirection: 'column'
  },
  deptName: {
    fontWeight: 'bold',
    color: '#2c3e50',
    fontSize: '16px'
  },
  deptStats: {
    color: '#7f8c8d',
    fontSize: '14px'
  },
  departmentFilter: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  filterSection: {
    marginBottom: '16px'
  },
  filterLabel: {
    marginRight: '12px',
    fontWeight: '500',
    color: '#2c3e50'
  },
  departmentSelect: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px'
  },
  postTypeFilters: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  filterBtn: {
    padding: '8px 16px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    backgroundColor: 'white',
    color: '#7f8c8d',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  activeFilterBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    borderColor: '#3498db'
  },
  deptStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  statItem: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  statNumber: {
    display: 'block',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#3498db'
  },
  statLabel: {
    display: 'block',
    fontSize: '14px',
    color: '#7f8c8d',
    marginTop: '4px'
  },
  departmentPosts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  post: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed'
  },
  urgentPost: {
    borderLeft: '4px solid #e74c3c'
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  username: {
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  department: {
    color: '#7f8c8d',
    fontSize: '14px'
  },
  time: {
    color: '#95a5a6',
    fontSize: '12px'
  },
  postType: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  urgentType: {
    backgroundColor: '#fee',
    color: '#e74c3c'
  },
  facultyType: {
    backgroundColor: '#e8f5e8',
    color: '#27ae60'
  },
  officialType: {
    backgroundColor: '#fff3cd',
    color: '#856404'
  },
  postTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '12px'
  },
  postContent: {
    color: '#34495e',
    lineHeight: '1.6',
    marginBottom: '16px'
  },
  postContentSection: {
    marginBottom: '16px'
  },
  resourcesTitle: {
    color: '#2c3e50',
    marginBottom: '8px'
  },
  resourcesList: {
    color: '#34495e',
    paddingLeft: '20px'
  },
  announcementDetails: {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px'
  },
  detailItem: {
    margin: '8px 0',
    color: '#34495e'
  },
  postAttachments: {
    marginBottom: '16px'
  },
  attachment: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    margin: '8px 0'
  },
  downloadBtn: {
    padding: '4px 8px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  assignmentInfo: {
    backgroundColor: '#e8f4fd',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px'
  },
  infoItem: {
    margin: '8px 0',
    color: '#34495e'
  },
  eventHighlights: {
    marginBottom: '16px'
  },
  highlightGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '12px'
  },
  highlightItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'center'
  },
  highlightIcon: {
    fontSize: '24px',
    marginBottom: '8px'
  },
  highlightLabel: {
    fontSize: '12px',
    color: '#34495e',
    fontWeight: '500'
  },
  eventInfo: {
    backgroundColor: '#fff3cd',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px'
  },
  postActions: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  action: {
    color: '#7f8c8d',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'color 0.3s ease'
  },
  link: {
    color: '#3498db',
    textDecoration: 'none'
  },
  facultyAvatar: {
    fontSize: '24px',
    marginRight: '8px'
  },
  facultyInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  facultyTitle: {
    color: '#7f8c8d',
    fontSize: '12px'
  },
  officialBadge: {
    fontSize: '24px',
    marginRight: '8px'
  },
  officialInfo: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default DepartmentPosts;