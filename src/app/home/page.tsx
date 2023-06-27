import PrivateRoute from "@/components/private-route";

export default function Home() {
    return (
        <PrivateRoute>
            <h1>Home</h1>
        </PrivateRoute>
    )
}