import api from "@/lib/axios";

export const userService = {
    uploadAvatar: async (formData: FormData) => {
        try {
            const res = await api.post("/users/uploadAvatar", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

    
            return res.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
}