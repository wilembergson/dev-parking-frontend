import Modal from "./modal";

type Props = {
    isVisible: boolean
    onClick?: any
}

export default function LogoutModal({ isVisible, onClick }: Props) {
    return (
        <Modal isVisible={isVisible}>
            <div onClick={() => null} className="flex flex-col  flex-wrap justify-center items-center bg-white rounded-lg p-12">
                <h1 className="font-principal font-black text-3xl text-gray-600 mb-10">
                    Tem certeza que deseja encerrar a sessão?
                </h1>
                <section className="flex w-full justify-around">
                    <button className="font-principal text-2xl text-white bg-green-500 px-5 py-2 rounded-lg hover:bg-green-400 transition duration-500">
                        Sim
                    </button>
                    <button className="font-principal text-2xl text-white bg-red-500 px-5 py-2 rounded-lg hover:bg-red-400 transition duration-500"
                        onClick={() => onClick(false)}>
                        Cancelar
                    </button>
                </section>
            </div>
        </Modal>
    )
}