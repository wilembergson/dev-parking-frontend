type Props = {
    type: string;
    placehoder: string;
}

export default function Input({type, placehoder}: Props) {
    return (
        <input
            className="flex w-4/5 my-3 rounded-lg border-none focus:outline-none p-3 text-gray-700"
            required
            type={type}
            placeholder={placehoder}
        />
    )
}