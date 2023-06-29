type Props = {
    type: string;
    placehoder: string;
    onChange: any;
    name:string;
    value:string;

}

export default function Input({type, placehoder, onChange, name, value}: Props) {
    return (
        <input
            className="flex w-4/5 my-3 rounded-lg border-none focus:outline-none p-3 text-gray"
            required
            placeholder={placehoder}
            type={type}
            onChange={onChange}
            name={name}
            value={value}
        />
    )
}