import Logo from "./Logo";

export default function Menu() {
  return (
    <div className="menu bg-zinc-900 p-4 flex justify-center">
      <a href="/">
        <Logo />
      </a>
    </div>
  );
}
