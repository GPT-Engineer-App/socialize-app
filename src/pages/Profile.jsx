import { useState, useEffect } from "react";
import { Box, Heading, Text, Avatar, Button, Input } from "@chakra-ui/react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setEditedName(userData.name);
        setEditedBio(userData.bio);
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editedName, bio: editedBio }),
      });

      if (response.ok) {
        setIsEditing(false);
        fetchUserProfile();
      }
    } catch (error) {
      console.error("Save profile error:", error);
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        プロフィール
      </Heading>
      <Avatar size="xl" name={user.name} src={user.avatar} mb={4} />
      {isEditing ? (
        <>
          <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} mb={2} />
          <Input value={editedBio} onChange={(e) => setEditedBio(e.target.value)} mb={2} />
          <Button onClick={handleSaveProfile}>保存</Button>
        </>
      ) : (
        <>
          <Heading size="md" mb={2}>
            {user.name}
          </Heading>
          <Text mb={4}>{user.bio}</Text>
          <Button onClick={handleEditProfile}>編集</Button>
        </>
      )}
    </Box>
  );
};

export default Profile;
