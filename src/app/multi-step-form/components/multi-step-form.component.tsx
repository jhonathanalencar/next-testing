import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikProps,
  FormikValues,
  useField,
} from "formik";
import {
  CheckboxWithLabel,
  TextField,
  Select,
  TextFieldProps,
} from "formik-mui";
import { number, object, string } from "yup";

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

interface FormValues {
  firstName: string;
  job: string;
  millionaire: boolean;
  money: number;
  description: string;
  city: string;
}

interface MultiStepFormProps {
  onSubmit: (formValues: FormValues) => void;
}

export function MultiStepForm({ onSubmit }: MultiStepFormProps) {
  return (
    <Card>
      <CardContent>
        <FormikStepper<FormValues>
          initialValues={{
            firstName: "",
            job: "EMPTY",
            city: "",
            millionaire: false,
            money: 0,
            description: "",
          }}
          onSubmit={async (values) => {
            await sleep(500);
            onSubmit(values);
          }}
        >
          <FormikStep
            label="Personal Data"
            validationSchema={object({
              firstName: string()
                .required("Your First Name is Required")
                .max(5, `Your name can't be longer than 5 chars`),
              city: string().required().min(8).max(11),
              job: string()
                .required("You need to select your job situation")
                .not(["EMPTY"], "You need to select your job situation"),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                id="firstName"
                fullWidth
                name="firstName"
                component={CustomTextFieldWithErrorMessage}
                label="First Name"
              />
            </Box>

            <Box paddingBottom={2}>
              <CustomDropdown name="job" />
            </Box>

            <Box paddingBottom={2}>
              <Field
                id="city"
                fullWidth
                name="city"
                component={CustomTextFieldWithErrorMessage}
                label="City"
              />
            </Box>

            <Box paddingBottom={2}>
              <Field
                name="millionaire"
                id="millionaire"
                type="checkbox"
                component={CheckboxWithLabel}
                Label={{ label: "I am a millionaire" }}
              />
            </Box>
          </FormikStep>
          <FormikStep
            label="Bank Accounts"
            validationSchema={object({
              money: number().when("millionaire", ([millionaire], schema) => {
                return millionaire
                  ? schema
                      .min(
                        1000000,
                        "Because you said you are a millionaire you need to have 1 million"
                      )
                      .required()
                  : schema.required();
              }),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="money"
                id="money"
                type="number"
                component={CustomTextFieldWithErrorMessage}
                label="All the money I have"
              />
            </Box>
          </FormikStep>
          <FormikStep label="More Info">
            <Box paddingBottom={2}>
              <Field
                fullWidth
                id="description"
                name="description"
                component={TextField}
                label="Description"
              />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

interface FormikStepProps
  extends Pick<
    FormikConfig<FormikProps<FormikValues>>,
    "children" | "validationSchema"
  > {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper<MyFormValues extends FormikValues>({
  children,
  ...props
}: FormikConfig<MyFormValues>) {
  const childrenArray = React.Children.toArray(
    typeof children === "function" ? children(props.validationSchema) : children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik<MyFormValues>
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export function CustomDropdown({ name }: { name: string }) {
  const [field, props] = useField(name);

  return (
    <FormControl fullWidth error={!!props.error}>
      <InputLabel htmlFor="job" className="sr-only">
        Job Situation
      </InputLabel>
      <Field
        component={Select}
        native
        name="job"
        inputProps={{
          id: "job",
          "aria-errormessage": props.error ? "job-error" : null,
        }}
      >
        {field.value !== "EMPTY" ? null : (
          <option value="EMPTY">Select your job situation</option>
        )}
        <option value="FULL">Full-Time</option>
        <option value="PART">Part-Time</option>
        <option value="UNEMPLOYED">Unemployed</option>
      </Field>
      <ErrorMessage name="job">
        {(message) => <FormHelperText id="job-error">{message}</FormHelperText>}
      </ErrorMessage>
    </FormControl>
  );
}

export function CustomTextFieldWithErrorMessage(props: TextFieldProps) {
  const hasError = !!props.form.errors[props.field.name];

  const inputProps = hasError
    ? {
        ...props.inputProps,
        "aria-errormessage": `${props.field.name}-helper-text`,
      }
    : props.inputProps;

  return <TextField {...props} inputProps={inputProps} />;
}
