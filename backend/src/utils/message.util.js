// update chat when have a new message
export const updateChatAfterCreateMessage = (chat, message, senderId) => {
    chat.set({
        lastMessage: message._id,
        lastMessageAt: message.createdAt,
    });

    // update unReadcounts of each members
    chat.members.forEach(member => {
        const memberId = member.userId.toString();
        const isSender = memberId === senderId.toString();
        // get previous unReadCount
        const prevCount = chat.unReadCounts.get(memberId) || 0;
        chat.unReadCounts.set(memberId, isSender ? 0 : prevCount + 1);
    });
}