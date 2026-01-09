import z from "zod";

const attachmentSchema = z.object({
    url: z.string().url("Invalid attachment url"),
    fileName: z.string().min(1, "File must have file name"),
    size: z.number().positive().max(20 * 1024 * 1024, "File too large (max 20MB)"),
});

export const sendDirectMessageSchema = {
    body: z.object({
        recipientId: z.string().min(1, "RecipientId is required"),
        chatId: z.string().min(1, "ChatId is required"),
        content: z.string().trim().max(5000, "Message is too long").optional(),
        type: z.enum(["text", "image", "file", "video", "audio"]).default("text"),
        attachments: z.array(attachmentSchema).max(5, "Maximum 5 attachments").optional(),
        replyTo: z.string().optional(),
    })
    .refine(
        (data) => data.content || (data.attachments && data.attachments.length > 0),
        {
            message: "Message must have content or attachments",
            path: ["content"],
        }
    ),
};

export const sendGroupMessageSchema = {
    body: z.object({
        chatId: z.string().min(1, "ChatId is required"),
        content: z.string().trim().max(5000, "Message is too long").optional(),
        type: z.enum(["text", "image", "file", "video", "audio"]).default("text"),
        attachments: z.array(attachmentSchema).max(5, "Maximum 5 attachments").optional(),
        replyTo: z.string().optional(),
    })
    .refine(
        (data) => data.content || (data.attachments && data.attachments.length > 0),
        {
            message: "Message must have content or attachments",
            path: ["content"],
        }
    ),
};