// pages/profile/index.tsx
import React, { useEffect } from 'react';
import ProfilePage from '../../components/Profile/Profile';
import { authSubscribe } from '@junobuild/core-peer'; // Adjust the import path as needed

const Profile: React.FC = () => {
 const [user, setUser] = useRecoilState(userState);

 useEffect(() => {
    const unsubscribe = authSubscribe((user: User | null) => {
      console.log("JUNO USER: ", user);
      setUser(user);
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
 }, []);

 return (
    <div>
      {user ? <ProfilePage userData={user} /> : <p>Loading...</p>}
    </div>
 );
};

export default Profile;