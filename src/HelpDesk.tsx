import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import {
  Box,
  Paper,
  Typography,
  TextField,  
  MenuItem,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import LinkIcon from "@mui/icons-material/Link";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";

const HelpDesk = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const formik = useFormik({
    initialValues: {
      email: "",
      subject: "Report objectionable content",
      url: "https://crux360.ai/",
      problem: "Report objectionable content",
      description: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      subject: Yup.string().required("Subject is required"),
      url: Yup.string()
        .url("Enter a valid URL (must include https://)")
        .required("URL is required"),
      problem: Yup.string().required("Please select a main problem"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form submitted:", values);
      console.log("Attached files:", attachedFiles);
      alert("Report submitted successfully!");
      editor?.commands.clearContent();
      setAttachedFiles([]);
      resetForm();
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        underline: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
        validate: (href) => /^https?:\/\//.test(href),
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      formik.setFieldValue("description", html);
      
      if (!editor.isEmpty) {
        formik.setFieldTouched("description", true, false);
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
    // Reset input value to allow selecting the same file again
    event.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const fieldRow = {
    display: "flex",
    alignItems: "center",
    mb: 2.5,
    width: "100%",
  };

  const labelStyle = {
    width: 180,
    flexShrink: 0,
    fontWeight: 600,
    color: "#111827",
    textAlign: "right" as const,
    mr: 4,
    pr: 2,
  };

  const inputStyle = (fieldName: string) => ({
    flex: 1,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#f3f4f6",
      borderRadius: "8px",
      transition: "border 0.2s ease",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "2px solid transparent",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #3b82f6",
      },
      ...(focusedField === fieldName && {
        "& .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #3b82f6",
        },
      }),
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: focusedField === fieldName ? "2px solid #3b82f6" : "2px solid #93c5fd",
      },
    },
  });

  const EditorToolbar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    return (
      <Box sx={{ borderBottom: "1px solid #e0e0e0", p: 1, bgcolor: "#f5f5f5" }}>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBold().run()}
          sx={{ mr: 1 }}
          color={editor.isActive("bold") ? "primary" : "default"}
        >
          <FormatBoldIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          sx={{ mr: 1 }}
          color={editor.isActive("italic") ? "primary" : "default"}
        >
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          sx={{ mr: 1 }}
          color={editor.isActive("underline") ? "primary" : "default"}
        >
          <FormatUnderlinedIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            const url = prompt("Enter URL (e.g., https://example.com)");
            if (url && url.trim()) {
              const formattedUrl =
                url.startsWith("http://") || url.startsWith("https://")
                  ? url
                  : `https://${url}`;
              editor.chain().focus().setLink({ href: formattedUrl }).run();
            }
          }}
          sx={{ mr: 1 }}
          color={editor.isActive("link") ? "primary" : "default"}
        >
          <LinkIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          sx={{ mr: 1 }}
          color={editor.isActive("bulletList") ? "primary" : "default"}
        >
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          sx={{ mr: 1 }}
          color={editor.isActive("orderedList") ? "primary" : "default"}
        >
          <FormatListNumberedIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          sx={{ mr: 1 }}
          color="default"
        >
          <FormatClearIcon />
        </IconButton>
      </Box>
    );
  };

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          justifyContent: "center",
          textAlign: "center",
          display: "flex",
          width: "100%",
          mt: 3,
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              mb: 1,
              fontWeight: 700,
              fontSize: "2em",
              lineHeight: "125%",
              color: "#111827",
              textAlign: "center",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            Report objectionable content
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              fontSize: "0.85rem",
              fontFamily: '"Inter", sans-serif',
              color: "#374151",
            }}
          >
            <b>Find answers to </b>
            <Box
              component="a"
              href="#"
              sx={{
                color: "#2563eb",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontFamily: '"Inter", sans-serif',
                fontWeight: "bold",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              frequently asked questions.
            </Box>
          </Typography>
        </Box>
      </Box>

      {/* Form */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          pt: 1,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 5,
            width: "400%",
            maxWidth: 750,
            borderRadius: 2,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              mb: 3,
              color: "#4b5563",
              fontSize: "0.9rem",
              textAlign: "center",
              width: "100%",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            <strong>Please note:</strong> This message will be sent to Crux,{" "}
            <strong>not to the author of the survey.</strong>
          </Typography>

          <form onSubmit={formik.handleSubmit} noValidate style={{ width: "100%" }}>
            {/* Email */}
            <Box sx={fieldRow}>
              <Typography sx={labelStyle}>
                Your e-mail address:
                <Typography component="span" sx={{ color: "#2563eb", fontWeight: "bold" }}>
                  *
                </Typography>
              </Typography>
              <TextField
                name="email"
                fullWidth
                size="small"
                placeholder="@"
                sx={inputStyle("email")}
                value={formik.values.email}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  setFocusedField(null);
                }}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>

            {/* Subject */}
            <Box sx={fieldRow}>
              <Typography sx={labelStyle}>
                Subject:
                <Typography component="span" sx={{ color: "#2563eb" }}>
                  *
                </Typography>
              </Typography>
              <TextField
                name="subject"
                fullWidth
                size="small"
                sx={inputStyle("subject")}
                value={formik.values.subject}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("subject")}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  setFocusedField(null);
                }}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
              />
            </Box>

            {/* URL */}
            <Box sx={fieldRow}>
              <Typography sx={labelStyle}>
                Objectionable content URL:
                <Typography component="span" sx={{ color: "#2563eb" }}>
                  *
                </Typography>
              </Typography>
              <TextField
                name="url"
                fullWidth
                size="small"
                sx={inputStyle("url")}
                value={formik.values.url}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("url")}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  setFocusedField(null);
                }}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
              />
            </Box>

            {/* Main Problem */}
            <Box sx={fieldRow}>
              <Typography sx={labelStyle}>
                Main problem
                <Typography component="span" sx={{ color: "#2563eb" }}>
                  *
                </Typography>
              </Typography>
              <TextField
                select
                name="problem"
                fullWidth
                size="small"
                sx={inputStyle("problem")}
                value={formik.values.problem}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("problem")}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  setFocusedField(null);
                }}
                error={formik.touched.problem && Boolean(formik.errors.problem)}
                helperText={formik.touched.problem && formik.errors.problem}
              >
                <MenuItem value="Report objectionable content">
                  Report objectionable content
                </MenuItem>
                <MenuItem value="Inappropriate language">
                  Inappropriate language
                </MenuItem>
                <MenuItem value="Hate speech">
                  I have a question about privacy/security
                </MenuItem>
                <MenuItem value="Harassment">I want to contact sales</MenuItem>
              </TextField>
            </Box>

            {/* TipTap Editor for Description */}
            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
              <Typography sx={{ ...labelStyle, pt: 1 }}>
                Describe the identified <br /> issue in detail:
                <Typography component="span" sx={{ color: "#2563eb" }}>
                  *
                </Typography>
              </Typography>
              <Box sx={{ flex: 1}}>
                <Paper
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: formik.touched.description && formik.errors.description 
                      ? "2px solid #d32f2f" 
                      : "2px solid transparent",
                    backgroundColor: "#f3f4f6",
                    transition: "border 0.2s ease",
                    "&:hover": {
                      border: "2px solid #3b82f6",
                    },
                    ...(focusedField === "description" && {
                      border: "2px solid #3b82f6",
                    }),
                    "& .ProseMirror": {
                      minHeight: "280px",
                      maxHeight: "300px",
                      overflowY: "auto",
                      fontSize: "0.95rem",
                      padding: "12px",
                      lineHeight: 1.6,
                      "&:focus": {
                        outline: "none",
                      },
                    },
                    "& .ProseMirror ul": {
                      paddingLeft: "20px",
                      listStyleType: "disc",
                    },
                    "& .ProseMirror ol": {
                      paddingLeft: "20px",
                      listStyleType: "decimal",
                    },
                    "& .ProseMirror li": {
                      marginBottom: "4px",
                    },
                    "& .ProseMirror a": {
                      color: "#1976d2",
                      textDecoration: "underline",
                      backgroundColor: "#e3f2fd",
                      padding: "2px 4px",
                      borderRadius: "3px",
                      border: "1px solid #bbdefb",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#bbdefb",
                        borderColor: "#90caf9",
                      },
                    },
                  }}
                >
                  <EditorToolbar editor={editor} />
                  <Box
                    onFocus={() => setFocusedField("description")}
                    onBlur={() => {
                      setFocusedField(null);
                      formik.setFieldTouched("description", true);
                    }}
                  >
                    <EditorContent editor={editor} />
                  </Box>
                </Paper>
                {formik.touched.description && formik.errors.description && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#d32f2f",
                      fontSize: "0.75rem",
                      ml: 1.75,
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    {formik.errors.description}
                  </Typography>
                )}

                {/* File Attachment Section */}
                <Box sx={{ mt: 2 }}>
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      component="span"
                      startIcon={<AttachFileIcon />}
                      sx={{
                        color: "#2563eb",
                        textTransform: "none",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        padding: "4px 8px",
                        "&:hover": {
                          backgroundColor: "transparent",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Attach a file
                    </Button>
                  </label>

                  {/* Display attached files */}
                  {attachedFiles.length > 0 && (
                    <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {attachedFiles.map((file, index) => (
                        <Chip
                          key={index}
                          label={`${file.name} (${formatFileSize(file.size)})`}
                          onDelete={() => handleRemoveFile(index)}
                          deleteIcon={<CloseIcon />}
                          sx={{
                            backgroundColor: "#e5e7eb",
                            fontSize: "0.85rem",
                            "& .MuiChip-deleteIcon": {
                              color: "#6b7280",
                              "&:hover": {
                                color: "#374151",
                              },
                            },
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Submit / Cancel */}
            <Box sx={{ textAlign: "center", mt: 3, width: "100%" }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#2666f0ff",
                  textTransform: "none",
                  px: 4,
                  py: 1.2,
                  fontSize: "1rem",
                  "&:hover": { backgroundColor: "#1d4ed8" },
                }}
              >
                Submit
              </Button>

              <Button
                variant="outlined"
                onClick={() => {
                  formik.resetForm();
                  editor?.commands.clearContent();
                  setAttachedFiles([]);
                }}
                sx={{
                  color: "black",
                  borderColor: "#d1d5db",
                  textTransform: "none",
                  px: 4,
                  py: 1.2,
                  ml: 3,
                  fontSize: "1rem",
                  "&:hover": {
                    borderColor: "#9ca3af",
                    backgroundColor: "#f9fafb",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default HelpDesk;