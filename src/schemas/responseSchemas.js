export const successResponseFormat = (data, message = "Request was successful", res) => {
    const response = {
        status: "success",
        message,
        ...data,
    };

    if (res) {
        const headers = res.getHeaders();
        response.headers = {
            "X-RateLimit-Limit": headers["x-ratelimit-limit"],
            "X-RateLimit-Remaining": headers["x-ratelimit-remaining"],
            "X-RateLimit-Reset": headers["x-ratelimit-reset"],
        };
    }

    return response;
};


export const errorResponseFormat = (error) => ({
  status: "error",
  error,
});
