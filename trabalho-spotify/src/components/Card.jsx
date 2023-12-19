export default function Card({ link, image, info }) {
  return (
    <a href={link} className="border rounded p-2">
      <div className="flex flex-col">
        <img src={image} className="rounded aspect-square mb-2 object-cover" />
        {info}
      </div>
    </a>
  );
}
