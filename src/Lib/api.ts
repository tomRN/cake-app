import axios from 'axios';
import { PostCake, Cake } from '../types';

const getBaseURL = () => {
    if (process.env.REACT_APP_STAGE === "dev" || !process.env.REACT_APP_STAGE) {
        if (process.env.TEST_LOCAL) return "http://localhost:4040/dev";
        return "https://muk48t5ptj.execute-api.eu-west-2.amazonaws.com/dev";
    }
    if (process.env.REACT_APP_STAGE === "prod") throw new Error("The api has not been deployed to production yet")
    else throw new Error("No url for stage: " + process.env.REACT_APP_STAGE)
}

export const getCakes = async (): Promise<Cake[]> => {
    const res = await axios.get(`${getBaseURL()}/cakes`);
    return res.data.cakes;
}

export const postCake = async (cake: PostCake): Promise<Cake> => {
    const res = await axios.post(`${getBaseURL()}/cakes`, cake);
    return res.data;
}

export const deleteCake = async (cakeID: string) => {
    const res = await axios.delete(`${getBaseURL()}/cakes/${cakeID}`);
    return res.data;
}