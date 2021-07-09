import React, { useEffect, useState } from "react"
import { RequestStatus, Cake, PostCake } from '../types'
import * as api from '../Lib/api';

export const useCakes = () => {
    const [cakes, setCakes] = useState<Cake[]>([]);
    const [initialFetchStatus, setInitialFetchStatus] = useState<RequestStatus>("NONE");
    const [postCakeStatus, setPostCakeStatus] = useState<RequestStatus>("NONE");
    const [deleteCakeStatus, setDeleteCakeStatus] = useState<RequestStatus>("NONE");


    useEffect(() => {
        if (initialFetchStatus === "NONE") {
            setInitialFetchStatus("PENDING");
            api.getCakes().then((data) => {
                setCakes(data);
                setInitialFetchStatus("SUCCESS");
            }).catch((e) => {
                console.warn(e);
                setInitialFetchStatus("ERROR");
            })
        }
    }, [initialFetchStatus]);

    const postCake = async (cake: PostCake) => {
        setPostCakeStatus("PENDING");
        try {
            let newCake = await api.postCake(cake);
            setPostCakeStatus("SUCCESS");
            setCakes([...cakes, newCake]);
        } catch (e) {
            setPostCakeStatus("ERROR")
        }
    }

    const resetPostCakeStatus = () => { setPostCakeStatus("NONE") }

    const deleteCake = async (cakeID: string) => {
        setDeleteCakeStatus("PENDING");
        try {
            let newCake = await api.deleteCake(cakeID);
            setDeleteCakeStatus("SUCCESS");
            setCakes([...cakes.filter(x => x.ID !== cakeID)]);
        } catch (e) {
            setDeleteCakeStatus("ERROR")
        }
    }

    const resetDeleteCakeStatus = () => { setDeleteCakeStatus("NONE") }


    return {
        cakes,
        initialFetchStatus,
        postCake,
        postCakeStatus,
        resetPostCakeStatus,
        deleteCake,
        deleteCakeStatus,
        resetDeleteCakeStatus
    }

}

export default useCakes;