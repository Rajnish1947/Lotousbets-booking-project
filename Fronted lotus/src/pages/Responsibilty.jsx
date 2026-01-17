import React from "react";

const Responsibility = () => {
  return (
    <div className="rounded-md w-full lg:max-w-[900px] p-4 lg:ml-1 mr-0 mb-5 overflow-hidden">
      <div className="w-[600px] mx-auto text-sm leading-relaxed text-gray-800">
        <p>
          The Site is committed to Responsible Gambling and we take our responsibilities towards our customers very seriously. We aim to provide an environment in which you can bet in a safe, fair and above all responsible manner.
        </p>
        <p className="mt-4">
          If you feel you may have a problem when it comes to controlling your gambling, please consider using one of our tools aimed at helping this:
        </p>
        <ol className="list-disc list-inside ml-5 space-y-2 mt-2">
          <li>By selecting a deposit limit per day, week, or month.</li>
          <li>By using our “time out” facility to allow you to suspend your account activity for durations of 24 hours, one week, one month, or any other period up to a maximum of 6 weeks.</li>
          <li>Opting for a self-exclusion, the minimum period being six months, which means your account will be blocked for a set amount of time. Self-exclusions cannot be undone and may only be unlocked by contacting customer services when the self-exclusion time runs out.</li>
        </ol>
      </div>
    </div>
  );
};

export default Responsibility;
