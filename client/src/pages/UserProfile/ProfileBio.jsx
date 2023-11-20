import React from "react";
import "./UserProfile.css";
import moment from "moment";

const ProfileBio = ({ currentProfile, currentUser, id }) => {
  return (
    <div>
      <div>
        {currentProfile?.tags.length !== 0 ? (
          <>
            <h4>Tags watched</h4>
            {currentProfile?.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </>
        ) : (
          <p>0 tags watched</p>
        )}
      </div>
      <div>
        {currentProfile?.about ? (
          <>
            <h4>About</h4>
            <p>{currentProfile?.about}</p>
          </>
        ) : (
          <p>No bio found</p>
        )}
      </div>
      {currentUser?.result._id === id &&
        currentProfile?.loginHistory?.length > 0 && (
          <div>
            <h4>User Login History</h4>
            <div className="historyTable">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>IP Adress</th>
                    <th>Browser</th>
                    <th>OS</th>
                    <th>TimeStamp</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProfile.loginHistory.map((value, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{value.ip}</td>
                      <td>{value.browser}</td>
                      <td>{value.os}</td>
                      <td>
                        {moment(value.timeStamp).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
  );
};

export default ProfileBio;
