const blog = require("../models/blog")

const totalLike = (blogs) => {
    const reducer = (sum,item) => {
        return sum + item.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer,0)
}

const favouriteBlogAuthor = (blogs) => {
    const reducer = (mostLike, blog) => {
        return ( mostLike.likes !== undefined && mostLike.likes > blog.likes)? mostLike : blog
    }
    const mostLiked = blogs.reduce(reducer,{})
    const totalBLog  = blogs.reduce((sum,blog) => {
            return blog.author === mostLiked.author? sum + 1 : sum
        }, 0)
    result = {
        author: mostLiked.author,
        blogs: totalBLog
    }  
    
    return result
}

const mostLikeBlogAuthor = (blogs) => {
    const reducer = (mostLike,blog) => {
        return (mostLike.likes !== undefined && mostLike.likes > blog.likes)? mostLike : blog
    }
    const mostLiked = blogs.reduce(reducer,{})
    //console.log(mostLiked)
    const totalLike = blogs.reduce((sum,blog) => {
        return blog.author === mostLiked.author? sum + blog.likes : sum 
    },0)
    
    return {
        author: mostLiked.author,
        likes: totalLike
    }
}


module.exports = {
    totalLike,favouriteBlogAuthor,mostLikeBlogAuthor
}