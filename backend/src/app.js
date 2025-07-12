import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
<<<<<<< HEAD
import adminRoutes from "./routes/admin.routes.js";
import questionRoutes from "./routes/question.routes.js";
// import commentRoutes from "./routes/comment.routes.js";
=======
import questionRoutes from "./routes/QuestionRoutes.js";
import answerRoutes from "./routes/AnswerRoutes.js";
>>>>>>> b8658ca (changes)

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());


app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
<<<<<<< HEAD
app.use("/api/admin", adminRoutes);
app.use("/api/questions", questionRoutes);
// app.use("/api/comments", commentRoutes);
=======
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);
>>>>>>> b8658ca (changes)

export { app };
