import { Schema, model, Document, Types } from "mongoose";

interface BlogAttributes {
   media: {
    type: string;
    url: string;
  };
  title: string;
  description: string;
  commentedBy: Types.ObjectId[];
  comments: Types.ObjectId[];
  likedBy: Types.ObjectId[]; 
  likes: number;
   watchTime?: number;
}

interface BlogDocument extends Document, BlogAttributes {}

const blogSchema: Schema<BlogDocument> = new Schema({
 media: {
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
    commentedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  likes: {
    type: Number,
    default: 0,
  },
    watchTime: {
    type: Number,
    default: 0,
  },
});

blogSchema.pre<BlogDocument>("save", function (next) {
  if (this.isModified("comments")) {
    const uniqueCommentedBy = [...new Set(this.commentedBy.map(String))];
    this.commentedBy = uniqueCommentedBy.map(
      (commentedBy) => new Types.ObjectId(commentedBy)
    );
  }
  next();
});

const BlogModel = model<BlogDocument>("Blog", blogSchema);

export default BlogModel;
