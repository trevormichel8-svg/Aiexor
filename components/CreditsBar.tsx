"use client";

export default function CreditsBar({ user }: any) {
  const credits = user?.credits?.credits_remaining ?? 0;
  const used = user?.trial?.used ?? 0;

  return (
    <div className="text-center mb-6">
      {user?.subscription?.active ? (
        <p className="text-teal-400 font-semibold">
          ⭐ PRO MEMBER — Unlimited HD Downloads
        </p>
      ) : (
        <>
          <p className="text-yellow-400 font-semibold">
            Credits: {credits}
          </p>

          <p className="text-gray-400 text-sm">
            Free Trial Used: {used} / 3
          </p>
        </>
      )}
    </div>
  );
}
