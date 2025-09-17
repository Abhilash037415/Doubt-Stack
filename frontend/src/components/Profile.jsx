function Profile() {
  return (
    <div id="profile-section" className="section">
      <div className="profile-card">
        <h2>Your Profile</h2>
        <div className="profile-info">
          <p><strong>Username:</strong> student123</p>
          <p><strong>Department:</strong> Computer Science</p>
          <p><strong>Year:</strong> 3rd Year</p>
          <p><strong>Posts:</strong> 5</p>
          <p><strong>Reputation:</strong> 120 points</p>
        </div>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;
