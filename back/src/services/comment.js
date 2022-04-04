import db from '../models/index.js'
import UserService from './user.js';
import OrderService from './order.js';

class CommentService {
    constructor() {
        this.Comment = db.Comment;
        this.User = db.User;
        this.Profile = db.Profile;
        this.Reword = db.Reward;
        this.OrderServiceInterface = new OrderService();
    }

    // 작성자의 id number 확인
    async getWriterId(user_id){
        try{
            const user = await this.User.findOne({where: {user_id: user_id}});
            if(user){
                return user.id;
            }
            else {
                throw Error('Not Found User');
            }
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // artworkd의 Comment 조회
    async getArtworkComment(artwork_id) {
        try{
            const comments = await this.Comment.findAll({
                attributes: ['content', 'createdAt', 
                            [db.Sequelize.col('user.id'), 'id'],
                            [db.Sequelize.col('user.name'), 'name'], 
                            [db.Sequelize.col('user.profile.picture'), 'picture']],
                where: {
                    artwork_id : artwork_id
                },
                order: [['createdAt', 'DESC']],
                include: {
                    model: this.User,
                    attributes: [],
                    include: {
                        model: this.Profile,
                        attributes: []
                    }
                },
                nest: true
            })  

            console.log(comments);

            return comments;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // artwork_id에 댓글 하나 추가
    async postArtworkComment(artwork_id, content, user_id) {
        try{
            const userId = await this.getWriterId(user_id);
            const comment = await this.Comment.create({
                content: content,
                user_id: userId,
                artwork_id: artwork_id
            })

            const result = await this.Reword
            .findOrCreate({where: {user_id: userId}, defaults: {total_reward: 0}})
            .then((Reword, created) => {
                if(created){ // 해당 유저ID의 Reword 레코드 생성시
                    this.OrderServiceInterface.compensate(user_id, 1); 
                    this.Reword.update({
                        total_reward : Reword[0].total_reward + 1
                    },
                        {
                          where: {
                            user_id: userId
                          }
                        }
                    )
                    return true
                } else { // 해당 유저ID의 Reword 레코드 이미 존재할시
                    if(Reword[0].total_reward >= 10) return { status : false, msg : "Daily reward has been exceeded" } // 하루 총 보상이 10개 이상일시
                    // console.log(Reword[0].total_reward); 
                    this.OrderServiceInterface.compensate(user_id, 1); // 총 보상이 10개 미만이면 토큰보상을 진행합니다. 
                    this.Reword.update({
                        total_reward : Reword[0].total_reward + 1
                    },
                        {
                          where: {
                            user_id: userId
                          }
                        }
                    )
                    return true;
                }
            })

            

            return {data : comment, compensate : result} // 토큰보상이 진행됐을시 compensate 키값으로 true를 반환합니다
        }
        catch(err) {
            throw Error(err.toString());
        }
    }
}

export default CommentService;
