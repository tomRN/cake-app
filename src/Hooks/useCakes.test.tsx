import useCakes from './useCakes';
import { renderHook, act } from '@testing-library/react-hooks'
import * as api from '../Lib/api';

describe("The Hook for interacting with our cakes API", () => {

    const testCakes = [
        {
            ID: 'test-cake-1-ID'
        },
        {
            ID: 'test-cake-2-ID'
        }
    ]

    const newCake = {
        name: 'new-cake-1-name',
        comment: 'new-cake-1-comment',
        yumFactor: 1,
        imageURL: 'new-cake-1-image-url'
    }

    it("Initially returns an empty list of cakes and a PENDING status while it fetches", async () => {
        //@ts-ignore
        api.getCakes = jest.fn(() => Promise.resolve([]));

        const { result } = renderHook(() => useCakes())
        await act(async () => {
            expect(result.current.initialFetchStatus).toBe("PENDING");
            expect(result.current.cakes.length).toBe(0);
            expect(api.getCakes).toHaveBeenCalledTimes(1);
        });
    })


    it("Returns a status of success and a list of cakes when the initial fetch succeeds", async () => {
        //@ts-ignore
        api.getCakes = jest.fn(() => {
            return Promise.resolve(testCakes);
        })

        const { result, waitForNextUpdate } = renderHook(() => useCakes());

        await act(async () => {
            await waitForNextUpdate();
            expect(result.current.initialFetchStatus).toBe("SUCCESS");
            expect(result.current.cakes.length).toBe(2);
            expect(api.getCakes).toHaveBeenCalledTimes(1);
        })
    })

    it("Returns a status of error if the intial fetch fails", async () => {
        //@ts-ignore
        api.getCakes = jest.fn(() => {
            return Promise.reject();
        })

        const { result, waitForNextUpdate } = renderHook(() => useCakes());

        await act(async () => {
            await waitForNextUpdate();
            expect(result.current.initialFetchStatus).toBe("ERROR");
            expect(result.current.cakes.length).toBe(0);
            expect(api.getCakes).toHaveBeenCalledTimes(1);
        })
    });

    it("After a successfull initial fetch, lets us post a cake, sets the status correctly to pending", async () => {
        //@ts-ignore
        api.getCakes = jest.fn(() => {
            return Promise.resolve(testCakes);
        })

        //@ts-ignore
        api.postCake = jest.fn(async (cake: any) => {
            await wait(100)
            return {
                ID: 'new-cake-1-ID',
                ...cake
            }
        })

        //Initial fetch done
        const { result, waitForNextUpdate } = renderHook(() => useCakes());
        await act(async () => {
            await waitForNextUpdate();
            expect(result.current.initialFetchStatus).toBe("SUCCESS");
            expect(result.current.postCakeStatus).toBe("NONE");

        });


        //Post up our cake
        await act(async () => {
            let postPromise = result.current.postCake(newCake);
            await waitForNextUpdate();
            expect(result.current.postCakeStatus).toBe("PENDING");
        });
    })

    it("After a successfull initial fetch, lets us post a cake, adds it to the cake list, sets status to success", async () => {
        //@ts-ignore
        api.getCakes = jest.fn(() => {
            return Promise.resolve(testCakes);
        })

        //@ts-ignore
        api.postCake = jest.fn(async (cake: any) => {
            return {
                ID: 'new-cake-1-ID',
                ...cake
            }
        })

        //Initial fetch done
        const { result, waitForNextUpdate } = renderHook(() => useCakes());
        await act(async () => {
            await waitForNextUpdate();
            expect(result.current.initialFetchStatus).toBe("SUCCESS");
            expect(result.current.postCakeStatus).toBe("NONE");

        });


        //Post up our cake
        await act(async () => {
            let postPromise = result.current.postCake(newCake);
            await waitForNextUpdate();
            expect(result.current.postCakeStatus).toBe("SUCCESS");
            expect(result.current.cakes.length).toBe(3);
            expect(result.current.cakes.find(x => x.name === newCake.name)).toBeTruthy();
        });
    })

    it("After a successfull initial fetch, lets us post a cake, on an error, correcty sets status", async () => {
        //@ts-ignore
        api.getCakes = jest.fn(() => {
            return Promise.resolve(testCakes);
        })

        //@ts-ignore
        api.postCake = jest.fn(async (cake: any) => {
            throw new Error("API error")
        })

        //Initial fetch done
        const { result, waitForNextUpdate } = renderHook(() => useCakes());
        await act(async () => {
            await waitForNextUpdate();
            expect(result.current.initialFetchStatus).toBe("SUCCESS");
            expect(result.current.postCakeStatus).toBe("NONE");

        });


        //Post up our cake
        await act(async () => {
            let postPromise = result.current.postCake(newCake);
            await waitForNextUpdate();
            expect(result.current.postCakeStatus).toBe("ERROR");
            expect(result.current.cakes.length).toBe(2);
        });
    })

    it("Resets the postCake status to NONE when we call the method", async () => {
        //@ts-ignore
        api.getCakes = jest.fn(() => {
            return Promise.resolve(testCakes);
        })
        //@ts-ignore
        api.postCake = jest.fn(async (cake: any) => {
            throw new Error("API error")
        })

        //Initial fetch done
        const { result, waitForNextUpdate } = renderHook(() => useCakes());
        await act(async () => {
            await waitForNextUpdate();
            expect(result.current.postCakeStatus).toBe("NONE");
        });

        //Post up our cake
        await act(async () => {
            let postPromise = result.current.postCake(newCake);
            await waitForNextUpdate();
            expect(result.current.postCakeStatus).toBe("ERROR");
        });

        await act(async () => {
            result.current.resetPostCakeStatus()
            await waitForNextUpdate();
            expect(result.current.postCakeStatus).toBe("NONE");
        });
    })

})

const wait = (ms: number) => new Promise(resolve => setTimeout(Promise.resolve, ms))