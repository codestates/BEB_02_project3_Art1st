import db from '../models/index.js';
import ArtworkService from './artwork.js';

class LikeService {
    constructor() {
        this.Like = db.Like;
        this.ArtworkServiceInterface = new ArtworkService();
    }

    // user_id가 artwork_id에 좋아요를 누른 적이 있는지 확인
    async isLike(artwork_id, user_id){
        try{
            const isLike = await this.Like.findOne({where: {artwork_id: artwork_id, user_id: user_id}});
            if(isLike){// null이 아니면
                return true;
            }
            else{ // null이면
                return false;
            }
        }
        catch(err) {
            throw Error(err.toString());
        }
    }

    // user_id가 artwork_id에 좋아요를 누른 기록 조회
    async getUserArtworkLike(artwork_id, user_id) {
        try{
            const like = await this.Like.findOne({where: {artwork_id: artwork_id, user_id: user_id}});
            return like;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // artwork_id의 좋아요 조회
    async getArtworkLike(artwork_id) {
        try{
            await this.ArtworkServiceInterface.getOneArtwork(artwork_id);
            const likes = await this.Like.findAll({where: {artwork_id: artwork_id}});
            const count = likes.length;
            return {likes, count};
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // artwork_id에 좋아요 누르기
    async postArtworkLike(artwork_id, user_id) {
        try{
            await this.ArtworkServiceInterface.getOneArtwork(artwork_id);
            const user = await db.User.findOne({where: {user_id}});
            console.log(user);
            if(!user){
                throw Error('Not Found User');
            }
            const like = await this.Like.findOne({where: {artwork_id: artwork_id, user_id: user.id}});
            if(like){
                throw Error('Already pressed like');
            }
            else{
                await this.Like.create({
                    user_id: user.id,
                    artwork_id: artwork_id
                });
                return true;
            }
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // artwork_id에 좋아요 취소
    async deleteArtworkLike(artwork_id, user_id) {
        try{
            await this.ArtworkServiceInterface.getOneArtwork(artwork_id);
            const user = await db.User.findOne({where: {user_id}});
            if(!user){
                throw Error('Not Found User');
            }

            const like = await this.Like.findOne({where: {artwork_id: artwork_id, user_id: user.id}});
            if(!like){
                throw Error('Have never pressed LIKE before');
            }
            else{
                await this.Like.destroy({where:{artwork_id: artwork_id, user_id: user.id}});
                return true;
            }
        }
        catch(err) {
            throw Error(err.toString());
        }
    }
}

export default LikeService;