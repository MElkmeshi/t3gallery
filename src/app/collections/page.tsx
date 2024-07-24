import CollectionsList from "../_components/CollectionsList";

const Collections = async () => {
  return (
    <div className="container mx-auto mt-10 flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="mb-6 text-center text-2xl font-bold">Jebyaa</h1>
        <CollectionsList />
      </div>
    </div>
  );
};

export default Collections;
