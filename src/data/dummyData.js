import AIImage from '../assets/ai.jpg';
import DairyImage from '../assets/diary.jpg';
import HealthImage from '../assets/health.jpg';
import JapanImage from '../assets/japan.jpg';
import RemoteImage from '../assets/remote.jpg';
import ProfileImage from '../assets/remote.jpg';

export const users = [
  {
    id: "u1",
    username: "johndoe",
    email: "john@example.com",
    profileImage: ProfileImage,
    savedPosts: ["b2", "b4"],
    privatePosts: ["b3"],
  },
  {
    id: "u2",
    username: "janedoe",
    email: "jane@example.com",
    profileImage: ProfileImage,
    savedPosts: ["b1", "b5"],
    privatePosts: ["b6"],
  },
  {
    id: "u3",
    username: "techguy",
    email: "techguy@example.com",
    profileImage: ProfileImage,
    savedPosts: [],
    privatePosts: [],
  },
];

export const blogs = [
  {
    id: "b1",
    title: "The Rise of AI",
    authorId: "u1",
    category: "Technology",
    content: "AI is transforming industries globally dasjids ajd iasjdioj aisjdasj diojasiojdajsidj iodjasjdi jdsiaj ijasidj iojdxnshaduo iodjaiosj dioasjdio jasiodj aiosjdioasjdio jdijiodjasiodjasiojdio jiodasjiodj aiosjdiasj diojasdiojas...",
    image: AIImage,
    likes: ["u2", "u3"],
    comments: [
      { id: "c1", userId: "u2", text: "Very insightful!", timestamp: "2025-04-01" },
      { id: "c2", userId: "u3", text: "Can you share sources?", timestamp: "2025-04-02" },
    ],
    isPrivate: false,
    createdAt: "2025-03-30",
  },
  {
    id: "b2",
    title: "Travel Diaries: Japan",
    authorId: "u2",
    category: "Travel",
    content: "My journey through Tokyo and Kyoto...",
    image: JapanImage,
    likes: ["u1"],
    comments: [
      { id: "c3", userId: "u1", text: "Beautiful photos!", timestamp: "2025-04-01" },
    ],
    isPrivate: false,
    createdAt: "2025-03-28",
  },
  {
    id: "b3",
    title: "My Secret Thoughts",
    authorId: "u1",
    category: "Diary",
    content: "Private content here...",
    image: DairyImage,
    likes: [],
    comments: [],
    isPrivate: true,
    createdAt: "2025-03-25",
  },
  {
    id: "b4",
    title: "10 Tips for Remote Work",
    authorId: "u3",
    category: "Productivity",
    content: "Working from home can be hard. Here's how to win...",
    image: RemoteImage,
    likes: ["u1", "u2"],
    comments: [],
    isPrivate: false,
    createdAt: "2025-03-20",
  },
  {
    id: "b5",
    title: "Healthy Eating on a Budget",
    authorId: "u2",
    category: "Health",
    content: "You don't need to be rich to eat well...",
    image: HealthImage,
    likes: ["u3"],
    comments: [
      { id: "c4", userId: "u3", text: "Loved this, super helpful!", timestamp: "2025-04-03" },
    ],
    isPrivate: false,
    createdAt: "2025-03-15",
  },
  {
    id: "b6",
    title: "Private Thoughts on Work",
    authorId: "u2",
    category: "Diary",
    content: "Some confidential rants about life and work...",
    image: DairyImage,
    likes: [],
    comments: [],
    isPrivate: true,
    createdAt: "2025-03-10",
  },
  {
    id: "b7",
    title: "Private  on Work",
    authorId: "u2",
    category: "Diary",
    content: "Some confidential rants about life and work...",
    image: DairyImage,
    likes: [],
    comments: [],
    isPrivate: true,
    createdAt: "2025-03-10",
  },
];
