import SignInOutButton from "./SignIn-OutButton";

interface HeaderProps {
  session: boolean
}

export default function Header({session}: HeaderProps) {
      return (
        <header className="flex items-center mb-4 py-4 px-9">
            <h1 className=" w-fit text-4xl ml-auto p-3 border-8 border-double border-l-cyan-300 border-t-cyan-300 border-r-orange-400 border-b-orange-400">NoteShare</h1>
            <SignInOutButton session={session} />
        </header>
      )
  }