"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  SelectChangeEvent,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  BarChart,
  Bar,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Treemap,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";


import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ResponsiveLine } from '@nivo/line';
import { WordCloud } from '@isoterik/react-word-cloud';
import "tippy.js/dist/tippy.css";


const barChartData = [
  { name: "Mon", signups: 120, logins: 380 },
  { name: "Tue", signups: 180, logins: 420 },
  { name: "Wed", signups: 210, logins: 510 },
  { name: "Thu", signups: 160, logins: 390 },
  { name: "Fri", signups: 240, logins: 580 },
  { name: "Sat", signups: 90, logins: 220 },
  { name: "Sun", signups: 70, logins: 180 },
];

const lineChartData = [
  { name: "Jan", uv: 4000, pv: 2400 },
  { name: "Feb", uv: 3000, pv: 1398 },
  { name: "Mar", uv: 2000, pv: 9800 },
  { name: "Apr", uv: 2780, pv: 3908 },
  { name: "May", uv: 1890, pv: 4800 },
  { name: "Jun", uv: 2390, pv: 3800 },
  { name: "Jul", uv: 3490, pv: 4300 },
];

const pieChartData = [
  { name: "Riyadh", value: 380 },
  { name: "Meccah", value: 290 },
  { name: "Qassim", value: 210 },
  { name: "Madina", value: 95 },
  { name: "Dammam", value: 65 },
];

const COLORS = ["#42a5f5", "#66bb6a", "#ff9800", "#f44336", "#9c27b0"];

const treemapData = [
  {
    name: "axis",
    children: [
      { name: "Axis", size: 24593 },
      { name: "Axes", size: 1302 },
      { name: "AxisGridLine", size: 652 },
      { name: "AxisLabel", size: 636 },
      { name: "CartesianAxes", size: 6703 },
    ],
  },
  {
    name: "controls",
    children: [
      { name: "TooltipControl", size: 8435 },
      { name: "SelectionControl", size: 7862 },
      { name: "PanZoomControl", size: 5222 },
      { name: "HoverControl", size: 4896 },
      { name: "ControlList", size: 4665 },
      { name: "ClickControl", size: 3824 },
      { name: "ExpandControl", size: 2832 },
      { name: "DragControl", size: 2649 },
      { name: "AnchorControl", size: 2138 },
      { name: "Control", size: 1353 },
      { name: "IControl", size: 763 },
    ],
  },
  {
    name: "data",
    children: [
      { name: "Data", size: 20544 },
      { name: "NodeSprite", size: 19382 },
      { name: "DataList", size: 19788 },
      { name: "DataSprite", size: 10349 },
      { name: "EdgeSprite", size: 3301 },
      {
        name: "render",
        children: [
          { name: "EdgeRenderer", size: 5569 },
          { name: "ShapeRenderer", size: 2247 },
          { name: "ArrowType", size: 698 },
          { name: "IRenderer", size: 353 },
        ],
      },
      { name: "ScaleBinding", size: 11275 },
      { name: "TreeBuilder", size: 9930 },
      { name: "Tree", size: 7147 },
    ],
  },
  {
    name: "events",
    children: [
      { name: "DataEvent", size: 7313 },
      { name: "SelectionEvent", size: 6880 },
      { name: "TooltipEvent", size: 3701 },
      { name: "VisualizationEvent", size: 2117 },
    ],
  },
  {
    name: "legend",
    children: [
      { name: "Legend", size: 20859 },
      { name: "LegendRange", size: 10530 },
      { name: "LegendItem", size: 4614 },
    ],
  },
  {
    name: "operator",
    children: [
      {
        name: "distortion",
        children: [
          { name: "Distortion", size: 6314 },
          { name: "BifocalDistortion", size: 4461 },
          { name: "FisheyeDistortion", size: 3444 },
        ],
      },
      {
        name: "encoder",
        children: [
          { name: "PropertyEncoder", size: 4138 },
          { name: "Encoder", size: 4060 },
          { name: "ColorEncoder", size: 3179 },
          { name: "SizeEncoder", size: 1830 },
          { name: "ShapeEncoder", size: 1690 },
        ],
      },
      {
        name: "filter",
        children: [
          { name: "FisheyeTreeFilter", size: 5219 },
          { name: "VisibilityFilter", size: 3509 },
          { name: "GraphDistanceFilter", size: 3165 },
        ],
      },
      { name: "IOperator", size: 1286 },
      {
        name: "label",
        children: [
          { name: "Labeler", size: 9956 },
          { name: "RadialLabeler", size: 3899 },
          { name: "StackedAreaLabeler", size: 3202 },
        ],
      },
      {
        name: "layout",
        children: [
          { name: "RadialTreeLayout", size: 12348 },
          { name: "NodeLinkTreeLayout", size: 12870 },
          { name: "CirclePackingLayout", size: 12003 },
          { name: "CircleLayout", size: 9317 },
          { name: "TreeMapLayout", size: 9191 },
          { name: "StackedAreaLayout", size: 9121 },
          { name: "Layout", size: 7881 },
          { name: "AxisLayout", size: 6725 },
          { name: "IcicleTreeLayout", size: 4864 },
          { name: "DendrogramLayout", size: 4853 },
          { name: "ForceDirectedLayout", size: 8411 },
          { name: "BundledEdgeRouter", size: 3727 },
          { name: "IndentedTreeLayout", size: 3174 },
          { name: "PieLayout", size: 2728 },
          { name: "RandomLayout", size: 870 },
        ],
      },
      { name: "OperatorList", size: 5248 },
      { name: "OperatorSequence", size: 4190 },
      { name: "OperatorSwitch", size: 2581 },
      { name: "Operator", size: 2490 },
      { name: "SortOperator", size: 2023 },
    ],
  },
];

const scatterData01 = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const scatterData02 = [
  { x: 200, y: 260, z: 240 },
  { x: 240, y: 290, z: 220 },
  { x: 190, y: 290, z: 250 },
  { x: 198, y: 250, z: 210 },
  { x: 180, y: 280, z: 260 },
  { x: 210, y: 220, z: 230 },
];

/* Radar Chart Data - Q11 */
const radarData = [
  { subject: "Product Quality", company: 92, industry: 85 },
  { subject: "Features & Innovation", company: 88, industry: 78 },
  { subject: "Ease of Use", company: 95, industry: 82 },
  { subject: "Customer Support", company: 80, industry: 88 },
  { subject: "Value for Money", company: 85, industry: 90 },
  { subject: "Reliability", company: 90, industry: 87 },
];

/* Custom Dotted Line Chart Data ==================== */
const dottedLineData = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];


/* ==================== Custom Dot for Q12 ==================== */
const CustomizedDot = (props: any) => {
  const { cx, cy, value } = props;
  if (cx == null || cy == null) return null;

  if (value > 2500) {
    return (
      <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="red" viewBox="0 0 1024 1024">
        <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
      </svg>
    );
  }

  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="green" viewBox="0 0 1024 1024">
      <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
    </svg>
  );
};


//heatmap
const heatmapData = [
  { id: "Very Satisfied", data: [
    { x: "Strongly Agree", y: 428 },
    { x: "Agree", y: 312 },
    { x: "Neutral", y: 78 },
    { x: "Disagree", y: 28 },
    { x: "Strongly Disagree", y: 12 }
  ]},
  { id: "Satisfied", data: [
    { x: "Strongly Agree", y: 298 },
    { x: "Agree", y: 498 },
    { x: "Neutral", y: 298 },
    { x: "Disagree", y: 78 },
    { x: "Strongly Disagree", y: 32 }
  ]},
  { id: "Neutral", data: [
    { x: "Strongly Agree", y: 68 },
    { x: "Agree", y: 238 },
    { x: "Neutral", y: 612 },
    { x: "Disagree", y: 312 },
    { x: "Strongly Disagree", y: 148 }
  ]},
  { id: "Dissatisfied", data: [
    { x: "Strongly Agree", y: 22 },
    { x: "Agree", y: 68 },
    { x: "Neutral", y: 198 },
    { x: "Disagree", y: 498 },
    { x: "Strongly Disagree", y: 398 }
  ]},
  { id: "Very Dissatisfied", data: [
    { x: "Strongly Agree", y: 8 },
    { x: "Agree", y: 28 },
    { x: "Neutral", y: 98 },
    { x: "Disagree", y: 298 },
    { x: "Strongly Disagree", y: 788 }
  ]}
];

const lineChartNivoData = [
  {
    id: "Desktop",
    color: "#3b82f6",
    data: [
      { x: "Jan", y: 412 },
      { x: "Feb", y: 489 },
      { x: "Mar", y: 567 },
      { x: "Apr", y: 612 },
      { x: "May", y: 689 },
      { x: "Jun", y: 756 }
    ]
  },
  {
    id: "Mobile",
    color: "#10b981",
    data: [
      { x: "Jan", y: 298 },
      { x: "Feb", y: 356 },
      { x: "Mar", y: 423 },
      { x: "Apr", y: 498 },
      { x: "May", y: 567 },
      { x: "Jun", y: 678 }
    ]
  },
  {
    id: "Tablet",
    color: "#f59e0b",
    data: [
      { x: "Jan", y: 123 },
      { x: "Feb", y: 156 },
      { x: "Mar", y: 189 },
      { x: "Apr", y: 234 },
      { x: "May", y: 267 },
      { x: "Jun", y: 312 }
    ]
  }
];

// Word Cloud Data for Q14 - Most Frequent Customer Feedback Words
const wordCloudData = [
  { text: "Excellent", value: 89 },
  { text: "Fast Delivery", value: 76 },
  { text: "Great Support", value: 68 },
  { text: "Easy to Use", value: 64 },
  { text: "High Quality", value: 58 },
  { text: "Reliable", value: 52 },
  { text: "Affordable", value: 48 },
  { text: "Innovative", value: 45 },
  { text: "User-Friendly", value: 42 },
  { text: "Recommended", value: 40 },
  { text: "Smooth Experience", value: 38 },
  { text: "Best Ever", value: 35 },
  { text: "Love It", value: 33 },
  { text: "Perfect", value: 30 },
  { text: "Amazing", value: 28 },
  { text: "Slow", value: 18 },
  { text: "Expensive", value: 15 },
  { text: "Buggy", value: 12 },
  { text: "Confusing", value: 10 },
  { text: "Needs Improvement", value: 8 }
];

const useFetchJson = <T,>(url: string, limit?: number) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(json => {
        setData(limit ? json.slice(0, limit) : json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [url, limit]);
  return { data, loading };
};

interface IOlympicData {
  athlete: string; age: number; country: string; year: number; date: string;
  sport: string; gold: number; silver: number; bronze: number; total: number;
}

const renderBarChart = () => (
    <Card sx={{ borderRadius: 2, boxShadow: 1, mt: 2 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, color: "#333" }}>
          Q6: Bar Chart
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "#555" }}>
          Use Cases - <strong>Single-Choice, Rating Questions(0-10), Yes/No, Demographics i.e., Age,Gender..</strong>
        </Typography>
        <Box sx={{ height: 420 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              {/* <RechartsXAxis dataKey="name" tick={{ fill: "#555" }} />
              <RechartsYAxis tick={{ fill: "#555" }} /> */}
              <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
              {/* <Legend wrapperStyle={{ paddingTop: "20px" }} /> */}
              <Bar dataKey="signups" fill="#42a5f5" radius={[8, 8, 0, 0]} />
              <Bar dataKey="logins" fill="#66bb6a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
  const renderLineChart = () => (
    <Card sx={{ borderRadius: 2, boxShadow: 1, mt: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, color: "#333" }}>
          Q7: Average Line
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "#555" }}>
          Use Cases - <strong>Likert Scale 1--5 (Strongly Agree to Disagree)</strong>
        </Typography>
        <Box sx={{ height: 420 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              {/* <RechartsXAxis dataKey="name" tick={{ fill: "#555" }} />
              <RechartsYAxis tick={{ fill: "#555" }} /> */}
              <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
              {/* <Legend wrapperStyle={{ paddingTop: "20px" }} /> */}
              <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={4} dot={{ r: 6 }} activeDot={{ r: 9 }} />
              <Line type="monotone" dataKey="pv" stroke="#82ca9d" strokeWidth={4} dot={{ r: 6 }} activeDot={{ r: 9 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
  const renderPieChart = () => (
    <Card sx={{ borderRadius: 2, boxShadow: 1, mt: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, color: "#333" }}>
          Q8: Pie Chart
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "#555" }}>
        Use Cases - <strong>Single-Choice, Yes/No</strong>
        </Typography>
        <Box sx={{ height: 420 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={140}
                fill="#8884d8"
                dataKey="value"
                // label={({ name, value }) => `${name}: ${value}`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              {/* <Legend /> */}
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
  // Customized Content for Treemap (your original colors)
  const CustomizedContent = (props: any) => {
    const { depth, x, y, width, height, index, name, z } = props;
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d84b65"];
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={depth < 2 ? colors[index % colors.length] : colors[(index + 2) % colors.length]}
          stroke="#fff"
          strokeWidth={2}
        />
        {width > 70 && height > 40 && (
          <>
            <text x={x + width / 2} y={y + height / 2 - 10} textAnchor="middle" fontSize="16" fill="#fff" fontWeight="bold">
              {name}
            </text>
            <text x={x + width / 2} y={y + height / 2 + 12} textAnchor="middle" fontSize="14" fill="#fff">
              {z} km
            </text>
          </>
        )}
      </g>
    );
  };
  
  const renderTreemap = () => (
    <Card sx={{ borderRadius: 2, boxShadow: 1, mt: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, color: "#333" }}>
          Q9: Treemap
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "#555" }}>
          Use Cases- <strong>Demographics</strong>
        </Typography>
        <Box sx={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={treemapData}
              dataKey="size"
              // range={[64, 144]}
              nameKey="name"
              stroke="#fff"
              fill="#8884d8"
              content={<CustomizedContent />}
              isAnimationActive={true}
            >
              <Tooltip
                contentStyle={{ backgroundColor: "rgba(0,0,0,0.85)", color: "white", border: "none", borderRadius: 8 }}
                formatter={(value: any) => `${value} lines`}
              />
            </Treemap>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
  const renderScatterChart = () => (
    <Card sx={{ borderRadius: 2, boxShadow: 1, mt: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, color: "#333" }}>
          Q10: Scatter Chart
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "#555" }}>
         Use Cases - <strong>Likert Scale 1--5 (Strongly Agree to Disagree)</strong>
        </Typography>
        <Box sx={{ height: 420 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 10,
                left: 10,
              }}
            >
              <CartesianGrid
              stroke="#e8e8e8"
              strokeDasharray="4 4"
              strokeOpacity={0.7}
              // These two lines are the magic
              vertical={true}
              horizontal={true}
              fill="none"
            />
              {/* <XAxis dataKey="x" type="number" name="stature" unit="cm" /> */}
              <XAxis
              dataKey="x"
              type="number"
              tick={false}  
              axisLine={{ stroke: "#ddd" }}
              tickLine={false}
            />
              {/* <YAxis dataKey="y" type="number" name="weight" unit="kg" /> */}
              <YAxis
              dataKey="y"
              type="number"
              tick={false} 
              axisLine={{ stroke: "#ddd" }}
              tickLine={false}
            />
              <ZAxis dataKey="z" type="number" range={[64, 144]} name="score" unit="km" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} /> 
              {/* <Legend /> */}
              <Scatter name="A school" data={scatterData01} fill="#8884d8" />
              <Scatter name="B school" data={scatterData02} fill="#82ca9d" />
            </ScatterChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );

  const renderRadarChart = () => (
  <Card sx={{ borderRadius: 2, boxShadow: 3, mt: 4, overflow: "hidden" }}>
    <CardContent sx={{ p: 5, bgcolor: "#fafafa" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#1a3e72" }}>
        Q11: Radar Chart
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: "#555" }}>
        Use Cases - <strong>Key Performance Indicator (KPI) </strong>
      </Typography>
      <Box sx={{ height: 520 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="#ccc" />
            {/* <PolarAngleAxis dataKey="subject" tick={{ fontSize: 13 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} /> */}
            <Radar name="Our Company" dataKey="company" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.7} strokeWidth={3} />
            <Radar name="Industry Avg" dataKey="industry" stroke="#10b981" fill="#10b981" fillOpacity={0.4} strokeDasharray="5 5" />
            <Tooltip formatter={(v: number) => `${v}/100`} />
            {/* <Legend /> */}
          </RadarChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </Card>
);

const renderDottedLineChart = () => (
  <Card sx={{ borderRadius: 2, boxShadow: 3, mt: 4, overflow: "hidden" }}>
    <CardContent sx={{ p: 5, bgcolor: "#fafafa" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#1a3e72" }}>
        Q12: Dotted Line Chart
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: "#555" }}>
        Use Cases - <strong>Likert Scale 1--5 (Strongly Agree to Disagree)</strong>
      </Typography>
      <Box sx={{ height: 500 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dottedLineData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            {/* <XAxis dataKey="name" tick={{ fill: "#555" }} />
            <YAxis tick={{ fill: "#555" }} /> */}
            <Tooltip />
            {/* <Legend /> */}
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              strokeWidth={4}
              dot={<CustomizedDot />}
              name="Page Views (PV)"
            />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#82ca9d"
              strokeWidth={4}
              dot={false}
              name="Unique Visitors (UV)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </Card>
);

const renderHeatMapChart = () => (
  <Card sx={{ borderRadius: 2, boxShadow: 3, mt: 4, overflow: "hidden" }}>
    <CardContent sx={{ p: 5, bgcolor: "#fafafa" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#1a3e72" }}>
        Q13: Heatmap
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: "#555"}}>
       Use Cases - <strong>Likert Scale 1--5 (Strongly Agree to Disagree), Ranking Questions</strong>
      </Typography>
      <Box sx={{ height: 620, bgcolor: "white", borderRadius: 2 }}>
        <ResponsiveHeatMap
          data={heatmapData}
          margin={{ top: 100, right: 120, bottom: 100, left: 120 }}
          valueFormat=">-.0f"
          axisTop={{ tickRotation: -45, legend: "Agreement Level", legendPosition: "middle", legendOffset: -70 }}
          axisRight={{ legend: "Satisfaction Rating", legendPosition: "middle", legendOffset: 90 }}
          axisLeft={{ legend: "Satisfaction Rating", legendPosition: "middle", legendOffset: -100 }}
          colors={{ type: "diverging", scheme: "red_blue", divergeAt: 0.5, minValue: 0, maxValue: 800 }}
          emptyColor="#f0f0f0"
          labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          animate={true}
          hoverTarget="cell"
          tooltip={({ cell }) => (
            <div style={{ background: "white", padding: "10px 14px", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
              <strong>{cell.serieId}</strong> → <strong>{cell.data.x}</strong><br/>
              <span style={{ color: "#1976d2", fontWeight: "bold" }}>{cell.value} respondents</span>
            </div>
          )}
          legends={[
            {
              anchor: "bottom",
              translateY: 80,
              length: 500,
              thickness: 12,
              direction: "row",
              title: "Number of Respondents →",
              titleAlign: "middle",
            }
          ]}
        />
      </Box>
    </CardContent>
  </Card>
);

const renderLineChartNivo = () => (
  <Card sx={{ borderRadius: 2, boxShadow: 3, mt: 4, overflow: "hidden" }}>
    <CardContent sx={{ p: 5, bgcolor: "#fafafa" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#1a3e72" }}>
        Q14: Trend Line Chart
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: "#555" }}>
        Use Cases - <strong>Rating Questions</strong>
      </Typography>
      <Box sx={{ height: 520 }}>
        <ResponsiveLine
          data={lineChartNivoData}
          // margin={{ top: 60, right: 140, bottom: 80, left: 80 }}
          // xScale={{ type: 'point' }}
          // yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false }}
            // axisTop={null}
            // axisRight={null}
            // axisBottom={{
            //   legend: 'Month',
            //   legendOffset: 46,
            //   legendPosition: 'middle'
            // }}
            // axisLeft={{
            //   legend: 'Number of Users',
            //   legendOffset: -60,
            //   legendPosition: 'middle'
            // }}
          colors={{ datum: 'color' }}
          pointSize={12}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={3}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-14}
          enableArea={true}
          areaOpacity={0.15}
          useMesh={true}
          enableCrosshair={true}
          crosshairType="x"
          animate={true}
          motionConfig="gentle"
          // legends={[
          //   {
          //     anchor: 'bottom-right',
          //     direction: 'column',
          //     justify: false,
          //     translateX: 120,
          //     translateY: 0,
          //     itemsSpacing: 8,
          //     itemDirection: 'left-to-right',
          //     itemWidth: 100,
          //     itemHeight: 24,
          //     itemOpacity: 0.85,
          //     symbolSize: 14,
          //     symbolShape: 'circle',
          //     effects: [
          //       {
          //         on: 'hover',
          //         style: {
          //           itemOpacity: 1
          //         }
          //       }
          //     ]
          //   }
          // ]}
        />
      </Box>
    </CardContent>
  </Card>
);


const wordCloudColors = [
  '#1e40af',
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
] as const;

const resolveFill = (_word: any, index: number) =>
  wordCloudColors[index % wordCloudColors.length];

// const fixedRotation = (_word: any, _index: number) => 0;
const rotate = (word: any) => {
  // 70% chance horizontal (0°), 15% -45°, 15% +45°
  const rand = Math.random();
  if (rand < 0.7) return 0;
  if (rand < 0.85) return -45;
  return 45;
};

const renderWordCloud = () => (
  <Card sx={{ borderRadius: 2, boxShadow: 3, mt: 4, overflow: "hidden" }}>
    <CardContent sx={{ p: 5, bgcolor: "#fafafa" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#1a3e72" }}>
        Q15: WordCloud
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: "#555" }}>
        Use Cases - <strong>Open Ended/Text</strong>
      </Typography>
      <Box sx={{ width: '100%', height: 520, bgcolor: "white", borderRadius: 2, p: 4 }}>
       <WordCloud
       words={wordCloudData}
       width={800}
       height={500} 
       font="Roboto, sans-serif"
       fontWeight="bold"
       fontSize={(word) => Math.log(word.value + 1) * 15 + 20}
       fill={resolveFill}
       padding={2}
       rotate={rotate}
       spiral="archimedean"
       onWordClick={(word) => alert(`"${word.text}" mentioned ${word.value} times`)}
/>
      </Box>
    </CardContent>
  </Card>
);


const surveyData: Record<string, SurveyData> = {
  "Customer Satisfaction": {
    stats: { total: 892, notStarted: 520, partiallyCompleted: 5, completed: 367 },
    questions: [
      {
        id: "q1",
        title: "Q1: How likely are you to recommend our customer support to a friend or colleague?",
        type: "nps",
        npsScore: 68,
        detractors: "8%",
        passives: "24%",
        promoters: "68%",
      },
      {
        id: "q2",
        title: "Q2: What could we do to improve your experience?",
        type: "multiple-choice",
        answers: [
          { answer: "Faster response time", count: 18, percentage: "55%" },
          { answer: "More knowledgeable agents", count: 10, percentage: "30%" },
          { answer: "Better self-service options", count: 5, percentage: "15%" },
        ],
        answered: 33,
        skipped: 2,
        progress: [
          { label: "Faster response time", percentage: 55, color: "#d32f2f" },
          { label: "More knowledgeable agents", percentage: 30, color: "#ff9800" },
          { label: "Better self-service options", percentage: 15, color: "#4caf50" },
        ],
      },
      {
        id: "q3",
        title: "Q3: How satisfied are you with our support team?",
        type: "csat",
        total: 30,
        score: "82%",
        badge: "CSAT",
        ratings: [
          { rating: 5, count: 16, color: "#4caf50", emoji: "🤩" },
          { rating: 4, count: 8, color: "#cddc39", emoji: "😊" },
          { rating: 3, count: 3, color: "#ff9800", emoji: "😐" },
          { rating: 2, count: 2, color: "#f44336", emoji: "😞" },
          { rating: 1, count: 1, color: "#d32f2f", emoji: "😡" },
        ],
      },
      {
        id: "q4",
        title: "Q4: How easy was it to get help from our team?",
        type: "ces",
        total: 28,
        score: "71%",
        badge: "CES",
        ratings: [
          { rating: 5, count: 12, color: "#4caf50", emoji: "⭐" },
          { rating: 4, count: 8, color: "#cddc39", emoji: "⭐" },
          { rating: 3, count: 4, color: "#ff9800", emoji: "⭐" },
          { rating: 2, count: 3, color: "#ff5722", emoji: "⭐" },
          { rating: 1, count: 1, color: "#d32f2f", emoji: "⭐" },
        ],
      },
    ],
  },
  "Product and Services": {
    stats: { total: 1034, notStarted: 695, partiallyCompleted: 2, completed: 337 },
    questions: [
      {
        id: "q6",
        title: "Q6: Daily User Activity (Last 7 Days)",
        type: "barchart",
      },
      {
        id: "q7",
        title: "Q7: Monthly Active Users vs Page Views",
        type: "linechart",
      },
      {
        id: "q8",
        title: "Q8: User Distribution by Region",
        type: "piechart",
      },
      {
        id: "q9",
        title: "Q9: Codebase Structure Overview",
        type: "treemap",
      },
      {
        id: "q10",
        title: "Q10: Student Performance Comparison (Height vs Weight vs Score)",
        type: "scatter",
      },
      {
        id: "q11", 
        title: "Q11: Product & Service Excellence vs Industry", 
        type: "radar"
      },
      {
        id: "q12", 
        title: "Q12: User Engagement Trend (Custom Dots)", 
        type: "dottedline"
      },
      { id: "q13", 
        title: "Q13: Satisfaction × Agreement Level Heatmap",
        type: "heatmap"
      },
      { 
      id: "q14", 
      title: "Q14: Traffic Sources Trend (Last 6 Months)", 
      type: "line-nivo" 
      },
      {
      id: "q15",
      title: "Q15: Most Frequent Words in Customer Feedback",
      type: "wordcloud"
      },
    ],
  },
};
const zeroStats = { total: 0, notStarted: 0, partiallyCompleted: 0, completed: 0 };

interface Question {
  id: string;
  title: string;
  type: "nps" | "multiple-choice" | "csat" | "ces" | "barchart" | "linechart" | "piechart" | "treemap" | "scatter" | "radar" | "dottedline" | "heatmap" | "line-nivo" | "wordcloud";
  npsScore?: number;
  detractors?: string;
  passives?: string;
  promoters?: string;
  answers?: { answer: string; count: number; percentage: string }[];
  answered?: number;
  skipped?: number;
  progress?: { label: string; percentage: number; color: string }[];
  total?: number;
  score?: string;
  badge?: "CSAT" | "CES";
  ratings?: { rating: number; count: number; color: string; emoji: string }[];
}

interface SurveyData {
  stats: { total: number; notStarted: number; partiallyCompleted: number; completed: number };
  questions: Question[];
}


  const AnalyzeAnswers: React.FC = () => {
  const [survey, setSurvey] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null); 
  useEffect(() => {
    setStartDate(dayjs("2025-10-01"));
    setEndDate(dayjs("2025-11-16"));
  }, []);

  const handleSurveyChange = (event: SelectChangeEvent) => setSurvey(event.target.value);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const isCorrectDateRange =
    startDate?.format("DD/MM/YYYY") === "01/10/2025" &&
    endDate?.format("DD/MM/YYYY") === "16/11/2025";

  const showRealData = survey && isCorrectDateRange;

 const CHART_TYPES = [
  "barchart", "linechart", "piechart", "treemap", "scatter",
  "radar", "dottedline", "heatmap", "line-nivo", "wordcloud"
] as const;

type ChartType = (typeof CHART_TYPES)[number];

// Then inside your useMemo:
const currentData = useMemo(() => {
  if (!showRealData || !surveyData[survey]) {
    return { stats: zeroStats, questions: [] };
  }

  let questions = surveyData[survey].questions;

  if (survey === "Product and Services") {
    questions = questions.filter(
      (q) => !!q.type && CHART_TYPES.some((t) => t === q.type)
    );
  }

  return { stats: surveyData[survey].stats, questions };
}, [showRealData, survey]);

const { stats, questions } = currentData;



const renderQuestion = (q: Question) => {
  if (q.type === "barchart") return renderBarChart();
  if (q.type === "linechart") return renderLineChart();
  if (q.type === "piechart") return renderPieChart();
  if (q.type === "treemap") return renderTreemap();
  if (q.type === "scatter") return renderScatterChart();
  if (q.type === "radar") return renderRadarChart();
  if (q.type === "dottedline") return renderDottedLineChart();
  if (q.type === "heatmap") return renderHeatMapChart();
  if (q.type === "line-nivo") return renderLineChartNivo();
  if (q.type === "wordcloud") return renderWordCloud();

  if (q.type === "nps" && q.npsScore !== undefined) {
      return (
        <Card key={q.id} sx={{ borderRadius: 2, boxShadow: 1, mt: 2, px: 4, py: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: "#333" }}>{q.title}</Typography>
          <Box sx={{ borderTop: "1px solid #eee", mt: 2, pt: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h3" sx={{ fontWeight: 500, color: "#263238", fontSize: "36px" }}>{q.npsScore}</Typography>
            <Typography sx={{ bgcolor: "#666", color: "white", px: 2, py: 0.5, borderRadius: 1, mt: 1, fontSize: "0.8rem" }}>NPS</Typography>
            <Box sx={{ display: "flex", gap: 6, mt: 4 }}>
              {[
                { label: "DETRACTORS", value: q.detractors ?? "0%", bg: "#d32f2f" },
                { label: "PASSIVES", value: q.passives ?? "0%", bg: "#fbc02d" },
                { label: "PROMOTERS", value: q.promoters ?? "0%", bg: "#388e3c" },
              ].map((item) => (
                <Box key={item.label} sx={{ textAlign: "center" }}>
                  <Typography variant="caption" sx={{ color: "#666", fontSize: "0.75rem" }}>{item.label}</Typography>
                  <Typography sx={{ bgcolor: item.bg, color: "white", px: 2, py: 0.5, borderRadius: 1, fontWeight: 600, mt: 1 }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      );
    }
    if (q.type === "multiple-choice" && q.answers && q.progress) {
      return (
        <Card key={q.id} sx={{ borderRadius: 2, boxShadow: 1, mt: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 500, color: "#333" }}>{q.title}</Typography>
            <Box sx={{ bgcolor: "#f9f9f9", p: 3, borderRadius: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", pb: 1, mb: 2, borderBottom: "1px solid #e0e0e0" }}>
                <Typography sx={{ fontWeight: 800, color: "#666", fontSize: "0.95rem" }}>Answer Choices</Typography>
                <Box sx={{ display: "flex", gap: 8 }}>
                  <Typography sx={{ fontWeight: 800, color: "#666", minWidth: 60, textAlign: "center" }}>Responses</Typography>
                  <Typography sx={{ fontWeight: 800, color: "#666", minWidth: 50, textAlign: "center" }}>%</Typography>
                </Box>
              </Box>
              {q.answers.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 2.5,
                    borderBottom: idx < q.answers!.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  <Typography sx={{ color: "#333" }}>{item.answer}</Typography>
                  <Box sx={{ display: "flex", gap: 8 }}>
                    <Typography sx={{ minWidth: 60, textAlign: "center" }}>{item.count}</Typography>
                    <Typography sx={{ minWidth: 50, textAlign: "center", fontWeight: 500 }}>{item.percentage}</Typography>
                  </Box>
                </Box>
              ))}
              {["Answered", "Skipped"].map((label) => (
                <Box key={label} sx={{ display: "flex", justifyContent: "space-between", py: 2, mt: 1, borderTop: "2px solid #e0e0e0" }}>
                  <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{label === "Answered" ? q.answered : q.skipped}</Typography>
                </Box>
              ))}
              <Box sx={{ mt: 6 }}>
                {q.progress.map((item, idx) => {
                  // const hoverKey = idx + q.id.charCodeAt(0);
                  const barId = `${q.id}-progress-${idx}`;
                  return (
                    <Box
                      key={barId}
                      sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}
                      // onMouseEnter={() => setHoveredIndex(hoverKey)}
                      onMouseEnter={() => setHoveredIndex(barId)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <Typography sx={{ minWidth: 180, fontWeight: 500, color: "#555" }}>{item.label}</Typography>
                      <Box sx={{ flex: 1, position: "relative" }}>
                        <Box sx={{ height: 32, bgcolor: "#f5f5f5", borderRadius: 1, overflow: "hidden" }}>
                          <Box
                            sx={{
                              width: `${item.percentage}%`,
                              height: "100%",
                              bgcolor: item.color,
                              transition: "all 0.3s ease",
                            }}
                          />
                        </Box>
                        {hoveredIndex === barId && (
                          <Box
                            sx={{
                              position: "absolute",
                              right: -50,
                              top: "50%",
                              transform: "translateY(-50%)",
                              bgcolor: item.color,
                              color: "white",
                              px: 1.5,
                              py: 0.5,
                              fontWeight: 600,
                              borderRadius: 1,
                              fontSize: "0.9rem",
                            }}
                          >
                            {item.percentage}%
                          </Box>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              
            </Box>
          </CardContent>
        </Card>
      );
    }
    if ((q.type === "csat" || q.type === "ces") && q.ratings && q.total !== undefined) {
      return (
        <Card key={q.id} sx={{ borderRadius: 2, boxShadow: 1, mt: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 500, color: "#333" }}>{q.title}</Typography>
            <Box sx={{ bgcolor: "#f9f9f9", p: 3, borderRadius: 1 }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "flex-start" }}>
                <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                  <Typography variant="h3" sx={{ fontSize: "3rem", fontWeight: 600 }}>{q.score}</Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>{q.total} total responses</Typography>
                  <Box
                    sx={{
                      bgcolor: "#666",
                      color: "white",
                      px: 1.5,
                      py: 0.3,
                      borderRadius: 1,
                      mt: 1,
                      fontSize: "0.75rem",
                      display: "inline-block",
                    }}
                  >
                    {q.badge}
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  {q.ratings.map((r) => {
                    const perc = q.total ? ((r.count / q.total) * 100).toFixed(1) : "0";
                    return (
                      <Box key={r.rating} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                        <Typography sx={{ minWidth: 20, textAlign: "right", fontWeight: 600, fontSize: "1.1rem" }}>{r.rating}</Typography>
                        <Box sx={{ fontSize: "1.6rem", minWidth: 40 }}>{r.emoji}</Box>
                        <Box sx={{ flex: 1, position: "relative" }}>
                          <Box sx={{ height: 24, bgcolor: "#e0e0e0", borderRadius: 2, overflow: "hidden" }}>
                            <Box sx={{ width: `${perc}%`, height: "100%", bgcolor: r.color, transition: "width 0.4s ease" }} />
                          </Box>
                          <Typography
                            sx={{
                              position: "absolute",
                              right: 10,
                              top: "50%",
                              transform: "translateY(-50%)",
                              fontWeight: 700,
                              fontSize: "0.9rem",
                              color: "#333",
                            }}
                          >
                            {r.count}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3, mt: -8.9, bgcolor: "#f5f6f9", minHeight: "100vh", fontFamily: "'Roboto', sans-serif" }}>
        {/* Header */}
        <Box>
          <Typography variant="caption" sx={{ color: "#4c5d65ff", textTransform: "uppercase", fontWeight: 100, letterSpacing: "0.1em" }}>
            Reports
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 200, color: "#333" }}>
              Analyze Answers
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="contained" sx={{ bgcolor: "#03A9F4", "&:hover": { bgcolor: "#0288d1" } }}>
                Export CSV
              </Button>
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{ sx: { py: 1 } }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <ArrowDownwardIcon sx={{ mr: 1 }} /> PPT
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ArrowDownwardIcon sx={{ mr: 1 }} /> PDF
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
        {/* Filters */}
        <Card sx={{ borderRadius: 2, boxShadow: 1, mt: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="survey-select-label">Survey</InputLabel>
                  <Select
                    labelId="survey-select-label"
                    value={survey}
                    label="Survey"
                    onChange={handleSurveyChange}
                  >
                    <MenuItem value="Customer Satisfaction">Customer Satisfaction</MenuItem>
                    <MenuItem value="Product and Services">Product and Services</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <DatePicker label="Start Date" value={startDate} onChange={setStartDate} format="DD/MM/YYYY" />
                  <Typography>to</Typography>
                  <DatePicker label="End Date" value={endDate} onChange={setEndDate} format="DD/MM/YYYY" />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* Stats Bar */}
        <Box sx={{ display: "flex", height: "110px", borderRadius: 1, overflow: "hidden", boxShadow: 1, mt: 4 }}>
          {[
            { title: "TOTAL", value: stats.total, bg: "#2196F3" },
            { title: "NOT STARTED", value: stats.notStarted, bg: "#757575" },
            { title: "PARTIALLY COMPLETED", value: stats.partiallyCompleted, bg: "#FFEB3B", color: "#000" },
            { title: "COMPLETED", value: stats.completed, bg: "#4CAF50" },
          ].map((card, i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                bgcolor: card.bg,
                color: card.color || "white",
                textAlign: "center",
                py: 2,
              }}
            >
              <Typography variant="body2" sx={{ textTransform: "uppercase", fontWeight: 300, mb: 1 }}>
                {card.title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 300 }}>
                {card.value}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Questions */}
        <Box sx={{ mt: 6 }}>
          {questions.map(renderQuestion)}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default AnalyzeAnswers;