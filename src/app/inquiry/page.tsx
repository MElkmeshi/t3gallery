import InquiryComponet from "../_components/InquiryComponet";

const inquiry = async () => {
  return (
    <div className="container mx-auto mt-10 flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="mb-6 text-center text-2xl font-bold">Jebyaa</h1>
        <InquiryComponet />
      </div>
    </div>
  );
};

export default inquiry;
