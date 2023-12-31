import { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../hooks/useAlertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const emailSchema = Yup.string()
    .email("Invalid email address")
    .required("Required");
  const commentSchema = Yup.string()
    .min(25, "Must be at least 25 characters")
    .required("Required");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "",
      message: "",
    },
    onSubmit: (values) => {
      submit("/", values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: emailSchema,
      type: Yup.string().optional(),
      comment: commentSchema,
    }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    onOpen(response.type, response.message);
    if (response.type === "success") {
      formik.resetForm();
    }
  };

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={
                  formik.touched.firstName && formik.errors.firstName
                    ? true
                    : false
                }
              >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.email && formik.errors.email ? true : false
                }
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" {...formik.getFieldProps("type")}>
                  <option style={{ color: "#777" }} value="hireMe">
                    Freelance project proposal
                  </option>
                  <option style={{ color: "#777" }} value="openSource">
                    Open source consultancy session
                  </option>
                  <option style={{ color: "#777" }} value="other">
                    Other
                  </option>
                </Select>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.comment && formik.errors.comment ? true : false
                }
              >
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isLoading={isLoading}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
