import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')

  const getData = async () => {
    setLoading(true)
    await axiosClient.get(url).then(res => {
      setLoading(false)
      setData(res.data)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  useEffect(() => {
    getData()
  }, [url])

  useEffect(() => {
    const search = async () => {
      setLoading(true)
      await axiosClient.get(`${url}/search/${query}`).then(res => {
        setLoading(false)
        console.log(res)
        setData(res.data)
      }).catch(err => {
        setLoading(false)
        console.log(err)
      })
    }
    if (query) {
      search()
    } else {
      getData()
    }
  }, [url, query])

  return {data, loading, setQuery}
}

export default useFetch
