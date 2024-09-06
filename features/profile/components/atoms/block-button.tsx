interface BlockButtonProps {
  onClick: () => void;
}

export function BlockButton({ onClick }: BlockButtonProps) {
  return <button onClick={onClick}>차단</button>;
}
