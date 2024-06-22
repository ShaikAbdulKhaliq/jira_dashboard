const all_data = [
  {
    "board_name": "MOB board",
    "board_type": "scrum",
    "board_id": "1",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/1"
  },
  {
    "board_name": "PILT board",
    "board_type": "scrum",
    "board_id": "102",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/102"
  },
  {
    "board_name": "test pilot",
    "board_type": "scrum",
    "board_id": "107",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/107"
  },
  {
    "board_name": "Product Management ",
    "board_type": "kanban",
    "board_id": "110",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/110"
  },
  {
    "board_name": "TechWarriors",
    "board_type": "kanban",
    "board_id": "112",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/112"
  },
  {
    "board_name": "Android TV/App",
    "board_type": "scrum",
    "board_id": "114",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/114"
  },
  {
    "board_name": "Green Pickle",
    "board_type": "scrum",
    "board_id": "115",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/115"
  },
  {
    "board_name": "VIS board",
    "board_type": "scrum",
    "board_id": "117",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/117"
  },
  {
    "board_name": "IE board",
    "board_type": "kanban",
    "board_id": "118",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/118"
  },
  {
    "board_name": "Infra Team",
    "board_type": "kanban",
    "board_id": "120",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/120"
  },
  {
    "board_name": "O20 board",
    "board_type": "kanban",
    "board_id": "121",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/121"
  },
  {
    "board_name": "Pilot srum test",
    "board_type": "scrum",
    "board_id": "123",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/123"
  },
  {
    "board_name": "Green Olive",
    "board_type": "scrum",
    "board_id": "124",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/124"
  },
  {
    "board_name": "DEV board",
    "board_type": "scrum",
    "board_id": "125",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/125"
  },
  {
    "board_name": "Gaian Websites",
    "board_type": "kanban",
    "board_id": "127",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/127"
  },
  {
    "board_name": "NCS board",
    "board_type": "scrum",
    "board_id": "128",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/128"
  },
  {
    "board_name": "Product Support Board",
    "board_type": "kanban",
    "board_id": "130",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/130"
  },
  {
    "board_name": "SHAP board",
    "board_type": "kanban",
    "board_id": "132",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/132"
  },
  {
    "board_name": "SHAPE-SCRUM",
    "board_type": "scrum",
    "board_id": "133",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/133"
  },
  {
    "board_name": "PLED board",
    "board_type": "scrum",
    "board_id": "135",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/135"
  },
  {
    "board_name": "Incois - All teams",
    "board_type": "kanban",
    "board_id": "136",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/136"
  },
  {
    "board_name": "UMP board",
    "board_type": "scrum",
    "board_id": "138",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/138"
  },
  {
    "board_name": "TechWarriors Sprint 6",
    "board_type": "scrum",
    "board_id": "140",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/140"
  },
  {
    "board_name": "MAV",
    "board_type": "scrum",
    "board_id": "141",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/141"
  },
  {
    "board_name": "Injection Server Board",
    "board_type": "simple",
    "board_id": "143",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/143"
  },
  {
    "board_name": "Jarvis",
    "board_type": "scrum",
    "board_id": "144",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/144"
  },
  {
    "board_name": "CHAAS board",
    "board_type": "kanban",
    "board_id": "147",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/147"
  },
  {
    "board_name": "AR board",
    "board_type": "kanban",
    "board_id": "148",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/148"
  },
  {
    "board_name": "MP board",
    "board_type": "kanban",
    "board_id": "149",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/149"
  },
  {
    "board_name": "Marketplace",
    "board_type": "scrum",
    "board_id": "150",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/150"
  },
  {
    "board_name": "ATSC1 board",
    "board_type": "scrum",
    "board_id": "153",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/153"
  },
  {
    "board_name": "Red Team - Deep Solutions",
    "board_type": "scrum",
    "board_id": "155",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/155"
  },
  {
    "board_name": "Blue Team - Integrations",
    "board_type": "scrum",
    "board_id": "162",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/162"
  },
  {
    "board_name": "Green SeaWeed",
    "board_type": "scrum",
    "board_id": "163",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/163"
  },
  {
    "board_name": "Green - Lime",
    "board_type": "scrum",
    "board_id": "164",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/164"
  },
  {
    "board_name": "DL board",
    "board_type": "simple",
    "board_id": "166",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/166"
  },
  {
    "board_name": "Olive sprint 3",
    "board_type": "scrum",
    "board_id": "168",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/168"
  },
  {
    "board_name": "Platform Ops",
    "board_type": "scrum",
    "board_id": "169",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/169"
  },
  {
    "board_name": "Devops",
    "board_type": "kanban",
    "board_id": "171",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/171"
  },
  {
    "board_name": "Olive Kanban Board",
    "board_type": "kanban",
    "board_id": "172",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/172"
  },
  {
    "board_name": "ST board",
    "board_type": "simple",
    "board_id": "174",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/174"
  },
  {
    "board_name": "HOT board",
    "board_type": "kanban",
    "board_id": "177",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/177"
  },
  {
    "board_name": "Kanban Board",
    "board_type": "kanban",
    "board_id": "178",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/178"
  },
  {
    "board_name": "MSUDeployments",
    "board_type": "scrum",
    "board_id": "179",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/179"
  },
  {
    "board_name": "Technical Debt",
    "board_type": "kanban",
    "board_id": "184",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/184"
  },
  {
    "board_name": "DS board",
    "board_type": "scrum",
    "board_id": "185",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/185"
  },
  {
    "board_name": "Backend Services Sprint Board",
    "board_type": "scrum",
    "board_id": "186",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/186"
  },
  {
    "board_name": "MP-Sprint-3",
    "board_type": "scrum",
    "board_id": "187",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/187"
  },
  {
    "board_name": "DU board",
    "board_type": "simple",
    "board_id": "188",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/188"
  },
  {
    "board_name": "MP-Sprint - 4",
    "board_type": "kanban",
    "board_id": "190",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/190"
  },
  {
    "board_name": "MP-Sprint-4",
    "board_type": "scrum",
    "board_id": "191",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/191"
  },
  {
    "board_name": "CDP board",
    "board_type": "scrum",
    "board_id": "193",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/193"
  },
  {
    "board_name": "COE",
    "board_type": "scrum",
    "board_id": "194",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/194"
  },
  {
    "board_name": "MP Sprint-4",
    "board_type": "scrum",
    "board_id": "195",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/195"
  },
  {
    "board_name": "MP",
    "board_type": "scrum",
    "board_id": "196",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/196"
  },
  {
    "board_name": "BPMN board",
    "board_type": "simple",
    "board_id": "197",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/197"
  },
  {
    "board_name": "KMD board",
    "board_type": "simple",
    "board_id": "198",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/198"
  },
  {
    "board_name": "UX Work",
    "board_type": "scrum",
    "board_id": "199",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/199"
  },
  {
    "board_name": "STF Testing",
    "board_type": "kanban",
    "board_id": "20",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/20"
  },
  {
    "board_name": "Experience Builder UX board",
    "board_type": "simple",
    "board_id": "201",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/201"
  },
  {
    "board_name": "COE Sprint4",
    "board_type": "scrum",
    "board_id": "202",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/202"
  },
  {
    "board_name": "IOS board",
    "board_type": "scrum",
    "board_id": "203",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/203"
  },
  {
    "board_name": "XPB board",
    "board_type": "simple",
    "board_id": "206",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/206"
  },
  {
    "board_name": "IN board",
    "board_type": "simple",
    "board_id": "207",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/207"
  },
  {
    "board_name": "devops2.0",
    "board_type": "kanban",
    "board_id": "209",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/209"
  },
  {
    "board_name": "STF Dev",
    "board_type": "kanban",
    "board_id": "21",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/21"
  },
  {
    "board_name": "RAR board",
    "board_type": "kanban",
    "board_id": "210",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/210"
  },
  {
    "board_name": "MIA board",
    "board_type": "simple",
    "board_id": "211",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/211"
  },
  {
    "board_name": "PROD board",
    "board_type": "simple",
    "board_id": "212",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/212"
  },
  {
    "board_name": "MMW board",
    "board_type": "simple",
    "board_id": "214",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/214"
  },
  {
    "board_name": "RR board",
    "board_type": "scrum",
    "board_id": "215",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/215"
  },
  {
    "board_name": "MPR board",
    "board_type": "simple",
    "board_id": "216",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/216"
  },
  {
    "board_name": "FR board",
    "board_type": "simple",
    "board_id": "217",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/217"
  },
  {
    "board_name": "DIG board",
    "board_type": "simple",
    "board_id": "218",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/218"
  },
  {
    "board_name": "SCS board",
    "board_type": "simple",
    "board_id": "219",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/219"
  },
  {
    "board_name": "SH board",
    "board_type": "simple",
    "board_id": "220",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/220"
  },
  {
    "board_name": "LA board",
    "board_type": "simple",
    "board_id": "221",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/221"
  },
  {
    "board_name": "JGS board",
    "board_type": "simple",
    "board_id": "222",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/222"
  },
  {
    "board_name": "backend roadmap",
    "board_type": "kanban",
    "board_id": "223",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/223"
  },
  {
    "board_name": "FEMA board",
    "board_type": "simple",
    "board_id": "224",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/224"
  },
  {
    "board_name": "NGTV board",
    "board_type": "simple",
    "board_id": "225",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/225"
  },
  {
    "board_name": "NIG board",
    "board_type": "simple",
    "board_id": "226",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/226"
  },
  {
    "board_name": "MRP board",
    "board_type": "simple",
    "board_id": "229",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/229"
  },
  {
    "board_name": "TPA board",
    "board_type": "simple",
    "board_id": "230",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/230"
  },
  {
    "board_name": "WM board",
    "board_type": "kanban",
    "board_id": "231",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/231"
  },
  {
    "board_name": "IW board",
    "board_type": "kanban",
    "board_id": "232",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/232"
  },
  {
    "board_name": "D2 board",
    "board_type": "kanban",
    "board_id": "233",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/233"
  },
  {
    "board_name": "INCOIS board",
    "board_type": "kanban",
    "board_id": "234",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/234"
  },
  {
    "board_name": "SP board",
    "board_type": "kanban",
    "board_id": "235",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/235"
  },
  {
    "board_name": "S1 board",
    "board_type": "kanban",
    "board_id": "236",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/236"
  },
  {
    "board_name": "LI board",
    "board_type": "kanban",
    "board_id": "237",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/237"
  },
  {
    "board_name": "ZB board",
    "board_type": "kanban",
    "board_id": "238",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/238"
  },
  {
    "board_name": "MW board",
    "board_type": "kanban",
    "board_id": "239",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/239"
  },
  {
    "board_name": "R1 board",
    "board_type": "kanban",
    "board_id": "240",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/240"
  },
  {
    "board_name": "MA board",
    "board_type": "kanban",
    "board_id": "242",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/242"
  },
  {
    "board_name": "SUP board",
    "board_type": "scrum",
    "board_id": "244",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/244"
  },
  {
    "board_name": "MB board",
    "board_type": "kanban",
    "board_id": "245",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/245"
  },
  {
    "board_name": "QS board",
    "board_type": "kanban",
    "board_id": "247",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/247"
  },
  {
    "board_name": "QB board",
    "board_type": "kanban",
    "board_id": "248",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/248"
  },
  {
    "board_name": "FE board",
    "board_type": "scrum",
    "board_id": "252",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/252"
  },
  {
    "board_name": "DAT board",
    "board_type": "scrum",
    "board_id": "253",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/253"
  },
  {
    "board_name": "IMPENG board",
    "board_type": "kanban",
    "board_id": "254",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/254"
  },
  {
    "board_name": "MPE Scrum Board",
    "board_type": "scrum",
    "board_id": "255",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/255"
  },
  {
    "board_name": "Design Sprint 2",
    "board_type": "scrum",
    "board_id": "257",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/257"
  },
  {
    "board_name": "MU board",
    "board_type": "scrum",
    "board_id": "258",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/258"
  },
  {
    "board_name": "Monet Scrum Board",
    "board_type": "scrum",
    "board_id": "259",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/259"
  },
  {
    "board_name": "MPI board",
    "board_type": "scrum",
    "board_id": "260",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/260"
  },
  {
    "board_name": "MBOB board",
    "board_type": "scrum",
    "board_id": "261",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/261"
  },
  {
    "board_name": "MMONET board",
    "board_type": "scrum",
    "board_id": "262",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/262"
  },
  {
    "board_name": "MHCY board",
    "board_type": "scrum",
    "board_id": "263",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/263"
  },
  {
    "board_name": "MVINCI board",
    "board_type": "scrum",
    "board_id": "264",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/264"
  },
  {
    "board_name": "Kathy`s view ",
    "board_type": "scrum",
    "board_id": "265",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/265"
  },
  {
    "board_name": "MSRE board",
    "board_type": "scrum",
    "board_id": "266",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/266"
  },
  {
    "board_name": "VB board",
    "board_type": "scrum",
    "board_id": "268",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/268"
  },
  {
    "board_name": "MON2 board",
    "board_type": "scrum",
    "board_id": "269",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/269"
  },
  {
    "board_name": "PQA board",
    "board_type": "scrum",
    "board_id": "271",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/271"
  },
  {
    "board_name": "M3IN1 board",
    "board_type": "scrum",
    "board_id": "272",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/272"
  },
  {
    "board_name": "MSUHAAAS board",
    "board_type": "scrum",
    "board_id": "275",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/275"
  },
  {
    "board_name": "PCPF board",
    "board_type": "scrum",
    "board_id": "276",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/276"
  },
  {
    "board_name": "SL board",
    "board_type": "simple",
    "board_id": "278",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/278"
  },
  {
    "board_name": "SRDP board",
    "board_type": "simple",
    "board_id": "279",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/279"
  },
  {
    "board_name": "BU board",
    "board_type": "scrum",
    "board_id": "280",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/280"
  },
  {
    "board_name": "MIAS board",
    "board_type": "scrum",
    "board_id": "281",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/281"
  },
  {
    "board_name": "MIE board",
    "board_type": "scrum",
    "board_id": "282",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/282"
  },
  {
    "board_name": "SRD board",
    "board_type": "scrum",
    "board_id": "283",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/283"
  },
  {
    "board_name": "MG board",
    "board_type": "kanban",
    "board_id": "288",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/288"
  },
  {
    "board_name": "MG 1.0 board",
    "board_type": "simple",
    "board_id": "289",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/289"
  },
  {
    "board_name": "LPB board",
    "board_type": "kanban",
    "board_id": "29",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/29"
  },
  {
    "board_name": "PIR board",
    "board_type": "scrum",
    "board_id": "292",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/292"
  },
  {
    "board_name": "RunRun Kanban",
    "board_type": "kanban",
    "board_id": "293",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/293"
  },
  {
    "board_name": "MRD board",
    "board_type": "kanban",
    "board_id": "294",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/294"
  },
  {
    "board_name": "PID board",
    "board_type": "simple",
    "board_id": "295",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/295"
  },
  {
    "board_name": "CQC board",
    "board_type": "simple",
    "board_id": "296",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/296"
  },
  {
    "board_name": "PR board",
    "board_type": "simple",
    "board_id": "297",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/297"
  },
  {
    "board_name": "TED board",
    "board_type": "scrum",
    "board_id": "298",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/298"
  },
  {
    "board_name": "BR board",
    "board_type": "simple",
    "board_id": "299",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/299"
  },
  {
    "board_name": "MOA board",
    "board_type": "scrum",
    "board_id": "300",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/300"
  },
  {
    "board_name": "IZAK board",
    "board_type": "scrum",
    "board_id": "302",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/302"
  },
  {
    "board_name": "AM board",
    "board_type": "scrum",
    "board_id": "303",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/303"
  },
  {
    "board_name": "AEGIS board",
    "board_type": "scrum",
    "board_id": "304",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/304"
  },
  {
    "board_name": "GOF board",
    "board_type": "scrum",
    "board_id": "305",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/305"
  },
  {
    "board_name": "HH board",
    "board_type": "scrum",
    "board_id": "306",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/306"
  },
  {
    "board_name": "RND board",
    "board_type": "scrum",
    "board_id": "307",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/307"
  },
  {
    "board_name": "MUS board",
    "board_type": "scrum",
    "board_id": "308",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/308"
  },
  {
    "board_name": "MPRSS board",
    "board_type": "scrum",
    "board_id": "309",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/309"
  },
  {
    "board_name": "CL board",
    "board_type": "scrum",
    "board_id": "310",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/310"
  },
  {
    "board_name": "VOT board",
    "board_type": "scrum",
    "board_id": "311",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/311"
  },
  {
    "board_name": "REVE board",
    "board_type": "scrum",
    "board_id": "312",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/312"
  },
  {
    "board_name": "MO board",
    "board_type": "scrum",
    "board_id": "313",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/313"
  },
  {
    "board_name": "MX board",
    "board_type": "scrum",
    "board_id": "342",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/342"
  },
  {
    "board_name": "VX board",
    "board_type": "scrum",
    "board_id": "343",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/343"
  },
  {
    "board_name": "AX board",
    "board_type": "scrum",
    "board_id": "345",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/345"
  },
  {
    "board_name": "SMS board",
    "board_type": "scrum",
    "board_id": "347",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/347"
  },
  {
    "board_name": "CMSX board",
    "board_type": "scrum",
    "board_id": "348",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/348"
  },
  {
    "board_name": "CD board",
    "board_type": "scrum",
    "board_id": "349",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/349"
  },
  {
    "board_name": "APP board",
    "board_type": "kanban",
    "board_id": "35",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/35"
  },
  {
    "board_name": "MOBIUS board",
    "board_type": "scrum",
    "board_id": "352",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/352"
  },
  {
    "board_name": "XSD board",
    "board_type": "scrum",
    "board_id": "353",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/353"
  },
  {
    "board_name": "MPI Board_React",
    "board_type": "scrum",
    "board_id": "366",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/366"
  },
  {
    "board_name": "MHCY board_React",
    "board_type": "scrum",
    "board_id": "367",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/367"
  },
  {
    "board_name": "EGCP board",
    "board_type": "scrum",
    "board_id": "368",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/368"
  },
  {
    "board_name": "MS board",
    "board_type": "scrum",
    "board_id": "369",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/369"
  },
  {
    "board_name": "ITIL/ITSM",
    "board_type": "scrum",
    "board_id": "370",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/370"
  },
  {
    "board_name": "ZTP board",
    "board_type": "simple",
    "board_id": "371",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/371"
  },
  {
    "board_name": "MORR board",
    "board_type": "scrum",
    "board_id": "372",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/372"
  },
  {
    "board_name": "PV board",
    "board_type": "scrum",
    "board_id": "376",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/376"
  },
  {
    "board_name": "RINK board",
    "board_type": "simple",
    "board_id": "377",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/377"
  },
  {
    "board_name": "PM board",
    "board_type": "scrum",
    "board_id": "4",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/4"
  },
  {
    "board_name": "CPO board",
    "board_type": "kanban",
    "board_id": "40",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/40"
  },
  {
    "board_name": "GO board",
    "board_type": "kanban",
    "board_id": "50",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/50"
  },
  {
    "board_name": "RDN board",
    "board_type": "kanban",
    "board_id": "52",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/52"
  },
  {
    "board_name": "RDA board",
    "board_type": "kanban",
    "board_id": "54",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/54"
  },
  {
    "board_name": "OW board",
    "board_type": "kanban",
    "board_id": "55",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/55"
  },
  {
    "board_name": "RCAP board",
    "board_type": "kanban",
    "board_id": "56",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/56"
  },
  {
    "board_name": "UI dev (JS)",
    "board_type": "scrum",
    "board_id": "6",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/6"
  },
  {
    "board_name": "CP board",
    "board_type": "kanban",
    "board_id": "60",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/60"
  },
  {
    "board_name": "Sprint 2",
    "board_type": "scrum",
    "board_id": "61",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/61"
  },
  {
    "board_name": "O2AS board",
    "board_type": "kanban",
    "board_id": "62",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/62"
  },
  {
    "board_name": "DSAS board",
    "board_type": "kanban",
    "board_id": "63",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/63"
  },
  {
    "board_name": "AA board",
    "board_type": "kanban",
    "board_id": "65",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/65"
  },
  {
    "board_name": "Product Management Tasks",
    "board_type": "kanban",
    "board_id": "67",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/67"
  },
  {
    "board_name": "Sprint 2",
    "board_type": "scrum",
    "board_id": "68",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/68"
  },
  {
    "board_name": "Sprint 1",
    "board_type": "scrum",
    "board_id": "69",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/69"
  },
  {
    "board_name": "TF-UI (Insights UI)",
    "board_type": "kanban",
    "board_id": "7",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/7"
  },
  {
    "board_name": "UI development board - sprint 2",
    "board_type": "scrum",
    "board_id": "70",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/70"
  },
  {
    "board_name": "Testing Team Board",
    "board_type": "scrum",
    "board_id": "71",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/71"
  },
  {
    "board_name": "Sprint 0",
    "board_type": "scrum",
    "board_id": "74",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/74"
  },
  {
    "board_name": "Sprint Board",
    "board_type": "scrum",
    "board_id": "76",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/76"
  },
  {
    "board_name": "NAAS board",
    "board_type": "kanban",
    "board_id": "77",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/77"
  },
  {
    "board_name": "GP board",
    "board_type": "scrum",
    "board_id": "78",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/78"
  },
  {
    "board_name": "MAYA board",
    "board_type": "scrum",
    "board_id": "79",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/79"
  },
  {
    "board_name": "AD board",
    "board_type": "kanban",
    "board_id": "8",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/8"
  },
  {
    "board_name": "HM board",
    "board_type": "scrum",
    "board_id": "80",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/80"
  },
  {
    "board_name": "AT board",
    "board_type": "scrum",
    "board_id": "81",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/81"
  },
  {
    "board_name": "L3AAS board",
    "board_type": "scrum",
    "board_id": "82",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/82"
  },
  {
    "board_name": "CES Scrum Board",
    "board_type": "scrum",
    "board_id": "83",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/83"
  },
  {
    "board_name": "CES Development Sprint Board",
    "board_type": "scrum",
    "board_id": "84",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/84"
  },
  {
    "board_name": "UI Development board 3",
    "board_type": "scrum",
    "board_id": "86",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/86"
  },
  {
    "board_name": "GSBG board",
    "board_type": "simple",
    "board_id": "87",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/87"
  },
  {
    "board_name": "scrum board - NAB",
    "board_type": "scrum",
    "board_id": "90",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/90"
  },
  {
    "board_name": "OCS board",
    "board_type": "scrum",
    "board_id": "91",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/91"
  },
  {
    "board_name": "Pitcher",
    "board_type": "scrum",
    "board_id": "97",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/97"
  },
  {
    "board_name": "CP",
    "board_type": "scrum",
    "board_id": "98",
    "self": "https://gaiansolutions.atlassian.net/rest/agile/1.0/board/98"
  }
]

const data = all_data.filter((b) => b.board_type == "scrum")


export default data
