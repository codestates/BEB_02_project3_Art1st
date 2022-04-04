import { Router } from "express";
import WebsiteService from "../../services/website.js";
const router = Router();

const WebsiteServiceInstance = new WebsiteService();

//특정 유저(user_id)의 전체 website 가져오기
router.get('/', async (req, res) => {
    const user_id = req.body.user_id;
    console.log(user_id)

    try{
        if(user_id === null){ // 전체 website 조회 (프로필 수정 페이지)
            const websites = await WebsiteServiceInstance.getUserWebsites(req.session.user_id);
            res.status(200).json(websites);
        }
        else { //전체 website 조회 
            const websites = await WebsiteServiceInstance.getUserWebsites(user_id);
            res.status(200).json(websites);
        }
    }
    catch(err){
        res.status(404).json(err.toString());
    }

})

// websites 데이터 하나 추가하기
router.post('/', async (req, res) => {
    const user_id = req.session.user_id;
    const user_site = req.body.user_site;

    try{
        if(user_id === undefined) return res.status(400).json("Error: Bad Request");
        const user_websites = await WebsiteServiceInstance.postUserWebsite(user_id, user_site);
        res.status(201).json(user_websites);

    }
    catch(err) {
        res.status(404).json(err.toString());
    }

})

// 특정 website 삭제하기(유저의 website 맞는지 확인)
router.delete('/', async(req, res) => {
    const website_id = req.body.website_id;
    const user_id = req.session.user_id;

    try{
        if(user_id === undefined) return res.status(400).json("Error: Bad Request");
        const user_website = await WebsiteServiceInstance.deleteUserWebsite(user_id, website_id);
        res.status(201).json(user_website);
    }   
    catch(err) {
        res.status(404).json(err.toString());
    }

})

export default router;
