import React, { useState, useEffect } from "react";
import "./index.scss";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

// import components
import AddNewLead from "../AddNewLead";
import SearchLead from "../SearchLead";
import LeadFullDisplay from "../LeadFullDisplay";
import LeadFullDisplay1 from "../LeadFullDisplay1";
import GeneralLeadsList from "../GeneralLeadsList";
import ActiveSubscribers from "../ActiveSubscribers";
import ManualMissions from "../ManualMissions";
import Statistics from "../Statistics";
import LogInPage from "../LogInPage";
import Header from "../Header";
import Account from "../Account";
import Settings from "../Settings";
import LeadsInProgTable from "../LeadsInProgTable";
import ManualMissionsFull from "../ManualMissionsFull";

import Page404 from "../Page404";
import { CircularProgress } from "@material-ui/core";

import { customerData } from "../../pData";

/*const useStylesLoading = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));*/

function Home(props) {
  const [data, setData] = useState(false);

  const [exampleData, setExampleData] = useState([
    {
      ID: "1",
      addedDate: "15/3/2021",
      addedHour: "12:51",
      leadSource: "טלפוני",
      name: "אביתר פולק",
      email: "almog@gmail.com",
      tel: "0526475424",
      branch: "הדר עם",
      lastUpdateDate: "1/4/2021",
      lastUpdateHour: "16:50",
      leadStep: "הוזמן לשיעור ניסיון",
      recommendedSystemMission: "",
      manualMissionDescription:
        "היה בשיעור היפ הופ בנים פעמיים. פעם ראשונה היה טוב ופעם שניה לא. מחכה לשיחה עם האמא",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "15/03/2021",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "התקשרנו והיה מענה - נקבע מועד שיעור ניסיון",
      ActivityLog3: "",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "1128816780862326",
      Group: null,
      "Form ID": null,
      "Page ID": null,
      "Ad name": null,
      "Ad ID": null,
      "Ad set Name": null,
      "Ad set ID": null,
      "Ad grioup ID": null,
      "campign name": null,
      "campaign ID": null,
      "Organic?": null,
      Custom: null,
      "partner name": null,
    },
    {
      ID: "2",
      addedDate: "08/04/2021",
      addedHour: "11:51",
      leadSource: "טלפוני",
      name: "אלמוג טל",
      email: "almog@gmail.com",
      tel: "0545265251",
      branch: "צורן_",
      lastUpdateDate: "1/4/2021",
      lastUpdateHour: "17:31",
      leadStep: "נרשם כמנוי",
      recommendedSystemMission: "",
      manualMissionDescription: "להתקשר להזמין לשיעור הקרוב של היפ הופ א-ב",
      manualTypeMission: "קביעת מועד לשיעור ניסיון",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "09/04/2021",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "TRUE",
      PurchasedAmount: "200",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "התקשרנו והיה מענה - נקבע מועד שיעור ניסיון",
      ActivityLog3: "התבצעה הרשמה",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "111",
      Group: null,
      "Form ID": null,
      "Page ID": null,
      "Ad name": null,
      "Ad ID": null,
      "Ad set Name": null,
      "Ad set ID": null,
      "Ad grioup ID": null,
      "campign name": null,
      "campaign ID": null,
      "Organic?": null,
      Custom: null,
      "partner name": null,
    },
    {
      ID: "3",
      addedDate: "15/3/2021",
      addedHour: "12:51",
      leadSource: "הגיע למשרד",
      name: "אביתר פולק",
      email: "almog@gmail.com",
      tel: "0526475424",
      branch: "הדר עם",
      lastUpdateDate: "1/4/2021",
      lastUpdateHour: "18:56",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription:
        "היה בשיעור היפ הופ בנים פעמיים. פעם ראשונה היה טוב ופעם שניה לא. מחכה לשיחה עם האמא",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "09/04/2021",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "TRUE",
      PurchasedAmount: "400",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "התקשרנו והיה מענה - נקבע מועד שיעור ניסיון",
      ActivityLog3: "התבצעה הרשמה",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "22",
      Group: null,
      "Form ID": null,
      "Page ID": null,
      "Ad name": null,
      "Ad ID": null,
      "Ad set Name": null,
      "Ad set ID": null,
      "Ad grioup ID": null,
      "campign name": null,
      "campaign ID": null,
      "Organic?": null,
      Custom: null,
      "partner name": null,
    },
    {
      ID: "4",
      addedDate: "1/4/2021",
      addedHour: "18:22",
      leadSource: "",
      name: "דני אבדיה",
      email: "aviv_afaf@hotmail.com",
      tel: "0542184321",
      branch: "נתניה",
      lastUpdateDate: "1/4/2021",
      lastUpdateHour: "18:51",
      leadStep: "נרשם כמנוי",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "TRUE",
      PurchasedAmount: "300",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "התבצעה הרשמה",
      ActivityLog3: "היה בשיעור ניסיון - מתקדם לרישום קבוע",
      ActivityLog4: "התבצעה הרשמה",
      ActivityLog5: null,
      ActivityLog6: null,
      ActivityLog7: null,
      ActivityLog8: null,
      ActivityLog9: null,
      ActivityLog10: null,
      ActivityLog11: null,
      ActivityLog12: null,
      DateActivityLog2: null,
      DateActivityLog3: null,
      DateActivityLog4: null,
      DateActivityLog5: null,
      DateActivityLog6: null,
      DateActivityLog7: null,
      DateActivityLog8: null,
      DateActivityLog9: null,
      DateActivityLog10: null,
      DateActivityLog11: null,
      DateActivityLog12: null,
      leadID: null,
      Group: null,
      "Form ID": null,
      "Page ID": null,
      "Ad name": null,
      "Ad ID": null,
      "Ad set Name": null,
      "Ad set ID": null,
      "Ad grioup ID": null,
      "campign name": null,
      "campaign ID": null,
      "Organic?": null,
      Custom: null,
      "partner name": null,
    },
    {
      ID: "5",
      addedDate: "2021-04-01",
      addedHour: "",
      leadSource: "fb",
      name: "Iren Druyan",
      email: "",
      tel: "972545227307",
      branch: "נתניה_",
      lastUpdateDate: "6/4/2021",
      lastUpdateHour: "19:43",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "דוברת רוסית. שלחתי הודעה ועוד לא ענתה",
      manualTypeMission: "לתזכר ליד",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "2021-04-13T17:41:09.000Z",
      manualMissionCreateByTeamMember: "liron",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "",
      ActivityLog3: "",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "1094840167661211",
      Group: "כיתות_א'-ג'",
      "Form ID": "309493707176982",
      "Page ID": "128169113957476",
      "Ad name": "3 רקדנים - מואר - רמה גבוהה",
      "Ad ID": "23847106484270502",
      "Ad set Name": "כל הסניפים - מחיר פר ליד",
      "Ad set ID": "23847106484260502",
      "Ad grioup ID": "23847106484270502",
      "campign name": "טופס לידים - כל הסניפים - אמאות 32-64",
      "campaign ID": "23847017345600502",
      "Organic?": "FALSE",
      Custom: null,
      "partner name": null,
    },
    {
      ID: "6",
      addedDate: "2021-04-01T17:48:48.000Z",
      addedHour: "",
      leadSource: "fb",
      name: "Rene Vaiss",
      email: "",
      tel: "972506373426",
      branch: "צורן",
      lastUpdateDate: "",
      lastUpdateHour: "",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "dd",
      manualTypeMission: "",
      dateManualMissionCreated: "10/4/2021",
      DeadlineDateManualMission: "15/4/2021",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "",
      ActivityLog3: "",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "503647363987774",
      Group: "כיתות_ד'-ו'",
      "Form ID": "309493707176982",
      "Page ID": "128169113957476",
      "Ad name": "‏3 רקדנים - מואר - רמה גבוהה‏ - עותק",
      "Ad ID": "23847058172750502",
      "Ad set Name": "נתניה - טופס לידים פייסבוק - אמאות‏ -",
      "Ad set ID": "23847058172740502",
      "Ad grioup ID": "23847058172750502",
      "campign name": "טופס לידים - כל הסניפים - אמאות 32-64",
      "campaign ID": "23847017345600502",
      "Organic?": "FALSE",
      Custom: null,
      "partner name": null,
    },
    {
      ID: "7",
      addedDate: "2021-04-01T20:17:40.000Z",
      addedHour: "",
      leadSource: "ig",
      name: "שקד אנסבכר",
      email: "",
      tel: "584225598",
      branch: "נתניה_",
      lastUpdateDate: "",
      lastUpdateHour: "",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "sssdd",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "19/4/2021",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "TRUE",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "",
      ActivityLog3: "",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "467139114726390",
      Group: "כיתות_י'_ומעלה",
      "Form ID": "309493707176982",
      "Page ID": "128169113957476",
      "Ad name": "‏3 רקדנים - מואר - רמה גבוהה‏ - עותק",
      "Ad ID": "23847058172750502",
      "Ad set Name": "נתניה - טופס לידים פייסבוק - אמאות‏ -",
      "Ad set ID": "23847058172740502",
      "Ad grioup ID": "23847058172750502",
      "campign name": "טופס לידים - כל הסניפים - אמאות 32-64",
      "campaign ID": "23847017345600502",
      "Organic?": "FALSE",
      Custom: null,
      "partner name": null,
    },
    {
      ID: "8",
      addedDate: "2021-04-02T04:23:06.000Z",
      addedHour: "",
      leadSource: "fb",
      name: "Limor Hannah Darmon",
      email: "",
      tel: "972547505978",
      branch: "צורן_",
      lastUpdateDate: "6/4/2021",
      lastUpdateHour: "19:45",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "שיעור ניסיון כיתה ד׳ צורן 8.4",
      manualTypeMission: "לתזכר ליד",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "11/04/2021",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "hadar",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "",
      ActivityLog3: "",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "491122798910426",
      Group: "כיתות_ד'-ו'",
      "Form ID": "309493707176982",
      "Page ID": "128169113957476",
      "Ad name": "3 רקדנים - מואר - רמה גבוהה",
      "Ad ID": "23847017345680502",
      "Ad set Name": "הדר עם - נתניה - צורן - טופס לידים פייסבוק - אמאות",
      "Ad set ID": "23847017345630502",
      "Ad grioup ID": "23847017345680502",
      "campign name": "טופס לידים - כל הסניפים - אמאות 32-64",
      "campaign ID": "23847017345600502",
      "Organic?": "FALSE",
      Custom: null,
      "partner name": null,
    },
    {
      ID: "9",
      addedDate: "2021-04-02T06:26:03.000Z",
      addedHour: "",
      leadSource: "fb",
      name: "ציון ראובן",
      email: "",
      tel: "972503331546",
      branch: "נתניה_",
      lastUpdateDate: "",
      lastUpdateHour: "",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "jjj",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "11/4/2021",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "",
      ActivityLog3: "",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "3818988111488901",
      Group: "כיתות_ד'-ו'",
      "Form ID": "309493707176982",
      "Page ID": "128169113957476",
      "Ad name": "‏3 רקדנים - מואר - רמה גבוהה‏ - עותק",
      "Ad ID": "23847058172750502",
      "Ad set Name": "נתניה - טופס לידים פייסבוק - אמאות‏ -",
      "Ad set ID": "23847058172740502",
      "Ad grioup ID": "23847058172750502",
      "campign name": "טופס לידים - כל הסניפים - אמאות 32-64",
      "campaign ID": "23847017345600502",
      "Organic?": "FALSE",
      Custom: null,
      "partner name": null,
    },
    {
      ID: "10",
      addedDate: "2021-04-02T10:07:44.000Z",
      addedHour: "",
      leadSource: "fb",
      name: "Lori Friedler",
      email: "",
      tel: "972586620669",
      branch: "הדר_עם",
      lastUpdateDate: "6/4/2021",
      lastUpdateHour: "19:51",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "xxx",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "11/04/2021",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "התקשרנו והיה מענה - לא רלוונטי",
      ActivityLog3: "",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "923064198443184",
      Group: "כיתות_א'-ג'",
      "Form ID": "309493707176982",
      "Page ID": "128169113957476",
      "Ad name": "‏3 רקדנים - מואר - רמה גבוהה‏ - עותק",
      "Ad ID": "23847058172750502",
      "Ad set Name": "נתניה - טופס לידים פייסבוק - אמאות‏ -",
      "Ad set ID": "23847058172740502",
      "Ad grioup ID": "23847058172750502",
      "campign name": "טופס לידים - כל הסניפים - אמאות 32-64",
      "campaign ID": "23847017345600502",
      "Organic?": "FALSE",
      Custom: null,
      "partner name": null,
    },
    {
      ID: "11",
      addedDate: "2021-04-02T14:03:25.000Z",
      addedHour: "",
      leadSource: "fb",
      name: "Ilanit Aba.",
      email: "",
      tel: "972522776044",
      branch: "נתניה_",
      lastUpdateDate: "6/4/2021",
      lastUpdateHour: "19:52",
      leadStep: "הוזמן לשיעור ניסיון",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "התקשרנו והיה מענה - נקבע מועד שיעור ניסיון",
      ActivityLog3: "",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "187106946370335",
      Group: "כיתות_ד'-ו'",
      "Form ID": "309493707176982",
      "Page ID": "128169113957476",
      "Ad name": "‏3 רקדנים - מואר - רמה גבוהה‏ - עותק",
      "Ad ID": "23847058172750502",
      "Ad set Name": "נתניה - טופס לידים פייסבוק - אמאות‏ -",
      "Ad set ID": "23847058172740502",
      "Ad grioup ID": "23847058172750502",
      "campign name": "טופס לידים - כל הסניפים - אמאות 32-64",
      "campaign ID": "23847017345600502",
      "Organic?": "FALSE",
      Custom: null,
      "partner name": null,
    },
    {
      ID: "12",
      addedDate: "2021-04-02T16:38:40.000Z",
      addedHour: "",
      leadSource: "ig",
      name: "Yoli Eidan Cohen",
      email: "",
      tel: "972544424667",
      branch: "נתניה_",
      lastUpdateDate: "",
      lastUpdateHour: "",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "",
      ActivityLog3: "",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "447999822953838",
      Group: "כיתות_א'-ג'",
      "Form ID": "309493707176982",
      "Page ID": "128169113957476",
      "Ad name": "‏3 רקדנים - מואר - רמה גבוהה‏ - עותק",
      "Ad ID": "23847058172750502",
      "Ad set Name": "נתניה - טופס לידים פייסבוק - אמאות‏ -",
      "Ad set ID": "23847058172740502",
      "Ad grioup ID": "23847058172750502",
      "campign name": "טופס לידים - כל הסניפים - אמאות 32-64",
      "campaign ID": "23847017345600502",
      "Organic?": "FALSE",
      Custom: null,
      "partner name": null,
    },
    {
      ID: "13",
      addedDate: "2021-04-02T17:09:46.000Z",
      addedHour: "",
      leadSource: "fb",
      name: "אתי דה-פז",
      email: "",
      tel: "972523331793",
      branch: "צורן",
      lastUpdateDate: "",
      lastUpdateHour: "",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "",
      ActivityLog3: "",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "183908176876639",
      Group: "כיתות_א'-ג'",
      "Form ID": "309493707176982",
      "Page ID": "128169113957476",
      "Ad name": "3 רקדנים - מואר - רמה גבוהה",
      "Ad ID": "23847017345680502",
      "Ad set Name": "הדר עם - נתניה - צורן - טופס לידים פייסבוק - אמאות",
      "Ad set ID": "23847017345630502",
      "Ad grioup ID": "23847017345680502",
      "campign name": "טופס לידים - כל הסניפים - אמאות 32-64",
      "campaign ID": "23847017345600502",
      "Organic?": "FALSE",
      Custom: null,
      "partner name": null,
    },
    {
      ID: "14",
      addedDate: "2021-04-02T19:08:31.000Z",
      addedHour: "",
      leadSource: "ig",
      name: "keren pinhas",
      email: "",
      tel: "525810984",
      branch: "נתניה_",
      lastUpdateDate: "",
      lastUpdateHour: "",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "",
      ActivityLog3: "",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "",
      DateActivityLog3: "",
      DateActivityLog4: "",
      DateActivityLog5: "",
      DateActivityLog6: "",
      DateActivityLog7: "",
      DateActivityLog8: "",
      DateActivityLog9: "",
      DateActivityLog10: "",
      DateActivityLog11: "",
      DateActivityLog12: "",
      leadID: "494313275258184",
      Group: "כיתות_א'-ג'",
      "Form ID": "309493707176982",
      "Page ID": "128169113957476",
      "Ad name": "‏3 רקדנים - מואר - רמה גבוהה‏ - עותק",
      "Ad ID": "23847058172750502",
      "Ad set Name": "נתניה - טופס לידים פייסבוק - אמאות‏ -",
      "Ad set ID": "23847058172740502",
      "Ad grioup ID": "23847058172750502",
      "campign name": "טופס לידים - כל הסניפים - אמאות 32-64",
      "campaign ID": "23847017345600502",
      "Organic?": "FALSE",
      Custom: null,
      "partner name": null,
    },
  ]);

  const getDataFromSheet = () => {
    const dataSheet = axios
      .get(props.relCrudApiUrl && props.relCrudApiUrl)
      .then((res) => {
        setData(res.data.filter((lead) => lead.ID != "1"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // disable to save cost of request during work
  useEffect(() => {
    getDataFromSheet();
  }, [props.relCrudApiUrl]);
  //console.log("data from sheet: ", data);

  return (
    <>
      {/* <CircularProgress color="secondary" /> */}
      <div className="home">
        <Switch>
          <Route exact path="/">
            {data ? (
              <GeneralLeadsList
                data={data}
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>

          <Route path="/active-subscribers">
            {data ? (
              <ActiveSubscribers
                data={data}
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/manual-missions">
            {data ? (
              <ManualMissions data={data} />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/manual-missions-full">
            {data ? (
              <ManualMissionsFull
                data={data}
                relCustomerDataObj={props.relCustomerDataObj}
                relCrudApiUrl={props.relCrudApiUrl}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/statistics">
            {data ? (
              <Statistics
                data={data}
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/add-new-lead">
            {data ? (
              <AddNewLead
                relCrudApiUrl={props.relCrudApiUrl}
                data={data}
                relBranchesAccordingToAccount={
                  props.relBranchesAccordingToAccount
                }
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/search-lead">
            {data ? (
              <SearchLead
                data={data}
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/my-account">
            {data ? (
              <Account
                user={props.user}
                data={data}
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/settings">
            {data ? (
              <Settings
                relBranchesAccordingToAccount={
                  props.relBranchesAccordingToAccount
                }
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/error-page-404">
            <Page404 />
          </Route>

          <Route path="/login">
            <LogInPage />
          </Route>

          <Route path="/leads-in-progress-table">
            <LeadsInProgTable
              data={data}
              relCustomerDataObj={props.relCustomerDataObj}
            />
          </Route>

          <Route path="/:id">
            {data ? (
              <LeadFullDisplay1
                data={data}
                relCrudApiUrl={props.relCrudApiUrl}
                relBranchesAccordingToAccount={
                  props.relBranchesAccordingToAccount
                }
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Home;
