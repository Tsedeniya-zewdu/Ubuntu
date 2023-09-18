import React from 'react'
import "./TermsComp.scss"
import { TermsParagraph } from './TermsParagraph'

const data = [
    {
        title: "Acceptance of Terms",
        text: "By accessing and using the fundraiser app website, you acknowledge and agree to be bound by these terms and conditions."
    },
    {
        title: "User Responsibilities",
        text: "Users are responsible for the accuracy of the information provided during registration and usage of the app. Users agree not to engage in any unlawful activities or submit false information."
    },
    {
        title: "Privacy and Data Protection",
        text: "The app maintains and protects user information in accordance with relevant privacy laws. User data will be used solely for the purposes of the app's functionality and will not be shared with third parties without proper consent."
    },
    {
        title: "Intellectual Property",
        text: "The fundraiser app website and its content are protected by intellectual property rights. Users agree not to reproduce, modify, or distribute any copyrighted materials without prior written consent."
    },
    {
        title: "User Conduct",
        text: "Users agree to use the app and website solely for lawful purposes and in a manner that respects the rights and privacy of others. Any abusive, harassing, or inappropriate behavior is strictly prohibited."
    },
    {
        title: "Donations",
        text: "Users understand that all donations made through the app are voluntary contributions towards the fundraising campaigns listed. The app does not guarantee the outcome or success of any specific campaign."
    },
    {
        title: "Notifications",
        text: "Users consent to receive notifications about new fundraisings and updates related to their donations. Users can adjust their notification preferences in their account settings."
    },
    {
        title: "Fundraiser Profiles",
        text: "Fundraisers are responsible for providing accurate information in their profiles, including personal details and needs. Fundraisers must abide by the app's guidelines and not engage in fraudulent or misleading activities."
    },
    {
        title: "Admin Rights",
        text: "The app administrators reserve the right to manage and moderate user accounts, fundraising projects, and donations. They may communicate with users, monitor activity, and generate reports and statistics for the app's improvement."
    },
    {
        title: "Limitation of Liability:",
        text: "The app reserves the right to modify, suspend, or terminate the website or any services provided at any time, without prior notice."
    },
    {
        title: "Amendments and Termination",
        text: "By accessing and using the fundraiser app website, you acknowledge and agree to be bound by these terms and conditions."
    },
    {
        title: "Governing Law",
        text: "These terms and conditions shall be governed by and construed in accordance with the laws of [your jurisdiction], and any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts of Ethiopia."
    }
]

export const TermsComp = () => {
  return (
      <div className='terms-comp-wrapper container-wrapper'>
          <div className='terms-comp container'>
              {data.map((data1) => {
                  return (
                      <TermsParagraph text={data1.text} title={data1.title} />
                  )
              })}
          </div>
    </div>
  )
}
