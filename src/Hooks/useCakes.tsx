import React, { useEffect, useState } from "react"
import { RequestStatus, Cake, PostCake } from '../types'
import * as api from '../Lib/api';

export const useCakes = () => {
    const [cakes, setCakes] = useState<Cake[]>([]);
    const [initialFetchStatus, setInitialFetchStatus] = useState<RequestStatus>("NONE");
    const [postCakeStatus, setPostCakeStatus] = useState<RequestStatus>("NONE");

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

    return {
        cakes,
        initialFetchStatus,
        postCake,
        postCakeStatus
    }

}

export default useCakes;