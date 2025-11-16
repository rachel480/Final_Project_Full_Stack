import { Box, Paper, Typography, Stack } from "@mui/material";
import BackButton from "../../../components/backButton";
import PageTitle from "../../../components/pageTitle";

const WizardLayout = ({ title, steps=[], step, onStepChange, renderStep, backNavigation }) => {

    const arrowLeftPercent = ((step - 1) / (steps.length - 1)) * 100

    return (
        <Box className="p-6 max-w-4xl mx-auto relative bg-[rgba(255,265,25,0.2)]">

            <PageTitle text={title} size="h4"/>

            <BackButton navigation={backNavigation} />

            <Stack direction="row" spacing={4} className="mb-8 justify-between mt-12">
                {steps.map((s) => (
                    <Box
                        key={s.number}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => onStepChange(s.number)}
                    >
                        <Box
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 font-bold text-white
                            ${step === s.number ? "bg-blue-600" : "bg-gray-400"}`}
                        >
                            {s.number}
                        </Box>

                        <Typography
                            variant="body2"
                            className={`${step === s.number
                                ? "text-blue-600 font-semibold"
                                : "text-gray-500"
                                }`}
                        >
                            {s.label}
                        </Typography>

                    </Box>
                ))}

            </Stack>

            <Box className="relative">
                <Box
                    className="absolute -top-3 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-blue-600 transition-all"
                    style={{ left: `calc(${arrowLeftPercent}% - 8px)` }}
                />

                <Paper elevation={2} className="p-6 rounded-xl shadow-md bg-white">
                    {renderStep()}
                </Paper>

            </Box>
        </Box>
    )
}

export default WizardLayout
