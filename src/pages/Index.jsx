import { useState } from "react";
import { Box, Button, Flex, Heading, Input, Text, Image, Avatar, IconButton, Menu, MenuButton, MenuList, MenuItem, Tabs, TabList, TabPanels, Tab, TabPanel, Textarea, useToast } from "@chakra-ui/react";
import { FaHome, FaSearch, FaUser, FaEnvelope, FaThumbsUp, FaThumbsDown, FaQuoteLeft, FaEllipsisV } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [communities, setCommunities] = useState([
    { id: 1, name: "ゲーム", members: 1000, posts: [] },
    { id: 2, name: "アニメ", members: 500, posts: [] },
    { id: 3, name: "プログラミング", members: 2000, posts: [] },
  ]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const toast = useToast();

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername("testuser");
    toast({ title: "ログインしました", status: "success" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    toast({ title: "ログアウトしました", status: "success" });
  };

  const handleCreateCommunity = () => {
    const newCommunity = {
      id: communities.length + 1,
      name: "新しいコミュニティ",
      members: 1,
      posts: [],
    };
    setCommunities([...communities, newCommunity]);
    toast({ title: "コミュニティを作成しました", status: "success" });
  };

  const handleSelectCommunity = (community) => {
    setSelectedCommunity(community);
  };

  const handlePost = (text) => {
    if (selectedCommunity) {
      const updatedCommunity = {
        ...selectedCommunity,
        posts: [...selectedCommunity.posts, { id: selectedCommunity.posts.length + 1, text, likes: 0, bads: 0 }],
      };
      const updatedCommunities = communities.map((c) => (c.id === selectedCommunity.id ? updatedCommunity : c));
      setCommunities(updatedCommunities);
      setSelectedCommunity(updatedCommunity);
      toast({ title: "投稿しました", status: "success" });
    }
  };

  return (
    <Box>
      <Flex bg="blue.500" p={4} justifyContent="space-between" alignItems="center">
        <Heading color="white">SNSアプリ</Heading>
        {isLoggedIn ? (
          <Flex alignItems="center">
            <Text color="white" mr={4}>
              {username}
            </Text>
            <Button colorScheme="red" size="sm" onClick={handleLogout}>
              ログアウト
            </Button>
          </Flex>
        ) : (
          <Button colorScheme="teal" size="sm" onClick={handleLogin}>
            ログイン
          </Button>
        )}
      </Flex>

      <Flex>
        <Box bg="gray.100" w="200px" p={4}>
          <Flex direction="column" mb={8}>
            <IconButton icon={<FaHome />} variant="ghost" mb={1} />
            <IconButton icon={<FaSearch />} variant="ghost" mb={1} />
            <IconButton icon={<FaUser />} variant="ghost" mb={1} />
            <IconButton icon={<FaEnvelope />} variant="ghost" />
          </Flex>

          <Heading size="md" mb={4}>
            コミュニティ
          </Heading>
          {communities.map((community) => (
            <Box key={community.id} p={2} borderWidth={1} rounded="md" mb={2} bg={community.id === selectedCommunity?.id ? "teal.500" : "white"} color={community.id === selectedCommunity?.id ? "white" : "black"} cursor="pointer" onClick={() => handleSelectCommunity(community)}>
              {community.name}
            </Box>
          ))}
          <Button colorScheme="teal" size="sm" onClick={handleCreateCommunity}>
            コミュニティ作成
          </Button>
        </Box>

        <Box flex={1} p={4}>
          {selectedCommunity ? (
            <Box>
              <Flex alignItems="center" mb={4}>
                <Heading size="lg" mr={4}>
                  {selectedCommunity.name}
                </Heading>
                <Text>メンバー数: {selectedCommunity.members}</Text>
              </Flex>

              <Box mb={8}>
                <Textarea placeholder="投稿内容" mb={2} />
                <Button colorScheme="teal" onClick={() => handlePost("新しい投稿")}>
                  投稿
                </Button>
              </Box>

              {selectedCommunity.posts.map((post) => (
                <Box key={post.id} borderWidth={1} rounded="md" p={4} mb={4}>
                  <Flex alignItems="center" mb={2}>
                    <Avatar size="sm" mr={2} />
                    <Text fontWeight="bold">ユーザー名</Text>
                  </Flex>
                  <Text mb={2}>{post.text}</Text>
                  <Flex>
                    <IconButton icon={<FaThumbsUp />} variant="ghost" size="sm" mr={1} />
                    <IconButton icon={<FaThumbsDown />} variant="ghost" size="sm" mr={1} />
                    <IconButton icon={<FaQuoteLeft />} variant="ghost" size="sm" mr={1} />
                    <Menu>
                      <MenuButton as={IconButton} icon={<FaEllipsisV />} variant="ghost" size="sm" />
                      <MenuList>
                        <MenuItem>編集</MenuItem>
                        <MenuItem>削除</MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Box>
              ))}
            </Box>
          ) : (
            <Box>
              <Heading size="lg" mb={4}>
                おすすめコミュニティ
              </Heading>
              <Flex>
                {communities.slice(0, 3).map((community) => (
                  <Box key={community.id} borderWidth={1} rounded="md" p={4} mr={4} cursor="pointer" onClick={() => handleSelectCommunity(community)}>
                    <Heading size="md" mb={2}>
                      {community.name}
                    </Heading>
                    <Text>メンバー数: {community.members}</Text>
                  </Box>
                ))}
              </Flex>
            </Box>
          )}
        </Box>

        <Box w="300px" bg="gray.100" p={4}>
          <Heading size="md" mb={4}>
            プロフィール
          </Heading>
          <Flex alignItems="center" mb={4}>
            <Avatar size="lg" mr={4} />
            <Box>
              <Text fontWeight="bold" mb={1}>
                {username}
              </Text>
              <Text fontSize="sm" color="gray.500">
                自己紹介文
              </Text>
            </Box>
          </Flex>
          <Tabs>
            <TabList>
              <Tab>投稿</Tab>
              <Tab>いいね</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text>投稿一覧</Text>
              </TabPanel>
              <TabPanel>
                <Text>いいねした投稿一覧</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Box>
  );
};

export default Index;
