import { CircularProgress} from "@chakra-ui/react"
export default function Loading() {
  return (
    <>
        <CircularProgress my="40" isIndeterminate color="orange.400" />
    </>
  );
}
