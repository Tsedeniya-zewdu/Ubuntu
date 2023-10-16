import React, { useEffect, useState } from 'react'
import './ReportsComp.scss'
import ReportCard1 from './ReportCard1'
import axios from 'axios'
import { Typography } from '@mui/material'
import { Chart } from 'chart.js/auto'
import { Bar, Pie } from 'react-chartjs-2'

export const ReportsComp = () => {
  const [completed, setCompleted] = useState(0)
  const [pending, setPending] = useState(0)
  const [open, setOpen] = useState(0)
  const [expired, setExpired] = useState(0)
  const [rejected, setRejected] = useState(0)
  const [totalProjects, setTotalProjects] = useState(0)
  const [pendingNews, setPendingNews] = useState(0)
  const [releasedNews, setReleasedNews] = useState(0)
  const [totalDonations, setTotalDonations] = useState(0)
  const [monthlyDonations, setMonthlyDonations] = useState(0)
  const [yearlyDonations, setYearlyDonations] = useState(0)
  const [dailyDonations, setDailyDonations] = useState(0)

  useEffect(() => {
    const getCompleted = async () => {
      const res = await axios.get('/projects/completed')
      try {
        setCompleted(res.data.length)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    const getPending = async () => {
      let pending1
      let pending2
      const res1 = await axios.get('/projects/pending1')
      try {
        pending1 = res1.data.length
      } catch (err) {
        console.log(err)
      }
      const res2 = await axios.get('/projects/pending2')
      try {
        pending2 = res2.data.length
      } catch (err) {
        console.log(err)
      }
      setPending(pending1 + pending2)
    }
    const getOpen = async () => {
      let res = await axios.get('/projects')
      try {
        setOpen(res.data.length)
      } catch (err) {
        console.log(err)
      }
    }
    const getExpired = async () => {
      let res = await axios.get('/projects/expired')
      try {
        setExpired(res.data.length)
      } catch (err) {
        console.log(err)
      }
    }
    const getRejected = async () => {
      let res = await axios.get('/projects/rejected')
      try {
        
        setRejected(res.data.length)
      } catch (err) {
        console.log(err)
      }
    }
    const getPendingNews = async () => {
      let res = await axios.get('/projects/news-pending')
      try {
        setPendingNews(res.data.length)
      } catch (err) {
        console.log(err)
      }
    }
    const getReleasedNews = async () => {
      let res = await axios.get('/projects/news')
      try {
        setReleasedNews(res.data.length)
      } catch (err) {
        console.log(err)
      }
    }
    const getDonations = async () => {
      let res = await axios.get('/donations')
      let totalSum = 0
      let yearSum = 0
      let monthSum = 0
      let daySum = 0
      let dateObj = new Date(Date.now())
      let currentYear = dateObj.getUTCFullYear()
      let currentMonth = dateObj.getUTCMonth()
      let currentDay = dateObj.getUTCDay()
      try {
        res.data.forEach((data) => {
          totalSum += data.amount
          let dataObj2 = new Date(data.createdAt)
          let donationYear = dataObj2.getUTCFullYear()
          let donationMonth = dataObj2.getUTCMonth()
          let donationDay = dataObj2.getUTCDay()
          if (donationYear == currentYear) {
            yearSum += data.amount
            if (donationMonth == currentMonth) {
              monthSum += data.amount
              if (donationDay == currentDay) {
                daySum += data.amount
              }
            }
          }
        })
        setTotalDonations(totalSum)
        setMonthlyDonations(monthSum)
        setYearlyDonations(yearSum)
        setDailyDonations(daySum)
      } catch (err) {
        console.log(err)
      }
    }
    getCompleted()
    getPending()
    getOpen()
    getExpired()
    getRejected()
    getPendingNews()
    getReleasedNews()
    getDonations()
  }, [])
  const reportCardData = [
    {
      title: 'Total donations',
      value: totalDonations + ' ETB',
    },
    {
      title: 'Yearly donations',
      value: yearlyDonations + ' ETB',
    },
    {
      title: 'Monthly donations',
      value: monthlyDonations + ' ETB',
    },
    {
      title: "Today's donations",
      value: dailyDonations + ' ETB',
    },
    {
      title: 'Total Projects',
      value: totalProjects,
    },
    {
      title: 'Completed Projects',
      value: completed,
    },
    {
      title: 'Pending Projects',
      value: pending,
    },
    {
      title: 'Open Projects',
      value: open,
    },
    {
      title: 'Expired Projects',
      value: expired,
    },
    {
      title: 'Rejected Projects',
      value: rejected,
    },
    {
      title: 'Pending News',
      value: pendingNews,
    },
    {
      title: 'Released News',
      value: releasedNews,
    },
    
  ]
  const projectData = [
    {
      title: 'Open Projects',
      value: open,
    },
    {
      title: 'Rejected Projects',
      value: rejected,
    },
    {
      title: 'Expired Projects',
      value: expired,
    },

    {
      title: 'Pending Projects',
      value: pending,
    },
    {
      title: 'Completed Projects',
      value: completed,
    },
  ]

  const chartData2 = [
    {
      title: 'Total',
      value: totalDonations,
    },
    {
      title: 'Yearly',
      value: yearlyDonations,
    },
    {
      title: 'Monthly',
      value: monthlyDonations,
    },
    {
      title: 'Daily',
      value: dailyDonations,
    },
  ]

  const [barChartData, setBarChartData] = useState({})
  const [chartData, setChartData] = useState({})

  useEffect(() => {
    setTotalProjects(pending + rejected + completed + open + expired)
    let tmp = {
      labels: projectData?.map((item) => item.title),
      datasets: [
        {
          label: 'amount',
          data: projectData?.map((item) => item.value),
        },
      ],
    }

    let tmp2 = {
      labels: chartData2?.map((item) => item.title),
      datasets: [
        {
          label: 'Donations amount in ETB',
          data: chartData2?.map((item) => item.value),
          backgroundColor: [
            "#8cf0f1",
            "#60af95",
            "#43ba2f",
            "#2a71d0"
              ]
        },
      ],
    }
    setBarChartData(tmp2)
    setChartData(tmp)
  }, [
    pending,
    rejected,
    completed,
    open,
    expired,
    dailyDonations,
    monthlyDonations,
    yearlyDonations,
    totalDonations,
  ])
  console.log(chartData)
  return (
    <div className="container-wrapper reports-comp-wrapper">
      <div className="container reports-comp">
        <div className="top-card-container">
          {reportCardData?.map((data) => {
            return (
              <ReportCard1
                key={data.title}
                title={data.title}
                value={data.value}
              />
            )
          })}
        </div>
        <div className="chart-main-wrapper">
          <div className="chart-wrapper chart-wrapper-1">
            <div className="chart">
              <Typography className="title">Donations Status</Typography>
              {Object.keys(barChartData).length != 0 && (
                <Bar data={barChartData}
                />
              )}
            </div>
          </div>
          <div className="chart-wrapper chart-wrapper-2">
            <div className="chart">
              <Typography className="title">Projects Status</Typography>
              {Object.keys(chartData).length != 0 && <Pie data={chartData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
