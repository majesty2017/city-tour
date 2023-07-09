import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

const useFetch = (url, pageNumber) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
  const [totalItemsCount, setTotalItemsCount] = useState(1)
  const [startFrom, setStartFrom] = useState(1)
  const [activePage, setActivePage] = useState(1)

  const getData = async () => {
    setLoading(true)
    await axiosClient.get(`${url}?page=${pageNumber}`).then(res => {
      setLoading(false)
      console.log(res.data)
      setData(res.data.data)
      setItemsCountPerPage(res.data.meta.per_page)
      setStartFrom(res.data.meta.from)
      setTotalItemsCount(res.data.meta.total)
      setActivePage(res.data.meta.current_page)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  useEffect(() => {
    getData()
  }, [url, pageNumber])

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

  return {data, activePage, itemsCountPerPage, totalItemsCount, startFrom, loading, setQuery}
}

export default useFetch
