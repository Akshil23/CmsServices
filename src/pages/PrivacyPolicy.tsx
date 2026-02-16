import React from "react";

const PrivacyPolicy: React.FC = () => {
	const lastUpdated: string = "February 15, 2026";
	const businessName: string = "CMS Services";
	const websiteUrl: string = "cmsservices.info";

	return (
		<div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
			<div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200">
				{/* Header Section */}
				<div className="bg-[#1e293b] py-10 px-8 text-center sm:text-left">
					<h1 className="text-3xl font-extrabold text-white tracking-tight">
						Privacy Policy
					</h1>
					<p className="text-slate-400 mt-2 text-lg">
						{businessName} | Professional Tax & Legal Services
					</p>
				</div>

				<div className="p-8 sm:p-12 text-slate-700 leading-relaxed space-y-8">
					<div className="flex items-center justify-between border-b border-slate-100 pb-4">
						<span className="text-sm font-medium text-slate-500 uppercase tracking-widest">
							Compliance Document
						</span>
						<span className="text-sm italic text-slate-400">
							Last Updated: {lastUpdated}
						</span>
					</div>

					<section>
						<p className="text-lg">
							At <span className="font-semibold text-slate-900">{businessName}</span>, we
							prioritize the confidentiality and security of your personal and financial
							data. This policy outlines our protocols for data collection and protection
							through our WhatsApp automation and tax filing infrastructure.
						</p>
					</section>

					{/* Section 1 */}
					<section className="space-y-3">
						<h2 className="text-xl font-bold text-slate-900 flex items-center">
							<span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">
								1
							</span>
							Information Collection
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
							<div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
								<h3 className="font-bold text-slate-800 mb-2">Personal Identity</h3>
								<ul className="list-disc ml-5 text-sm space-y-1">
									<li>Legal Name & Contact Details</li>
									<li>Government-issued Identification</li>
									<li>Social Insurance Number (SIN)</li>
								</ul>
							</div>
							<div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
								<h3 className="font-bold text-slate-800 mb-2">Tax & Financial</h3>
								<ul className="list-disc ml-5 text-sm space-y-1">
									<li>Residency & Entry Dates</li>
									<li>Income Statements (T4, W2)</li>
									<li>Marital & Dependent Status</li>
								</ul>
							</div>
						</div>
					</section>

					{/* Section 2 */}
					<section className="space-y-3">
						<h2 className="text-xl font-bold text-slate-900 flex items-center">
							<span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">
								2
							</span>
							Purpose of Processing
						</h2>
						<p className="pl-9">
							Data is used exclusively for preparing tax estimates, filing returns with
							the **Canada Revenue Agency (CRA)**, and providing legal/notary
							documentation. We do not engage in data mining or third-party marketing.
						</p>
					</section>

					{/* Section 3 */}
					<section className="space-y-3">
						<h2 className="text-xl font-bold text-slate-900 flex items-center">
							<span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">
								3
							</span>
							Security & WhatsApp API
						</h2>
						<p className="pl-9 italic">
							All communications via our WhatsApp bot are encrypted through the Meta Cloud
							API. Data is transferred via secure HTTPS protocols to our private A2
							Hosting servers located in Canada.
						</p>
					</section>

					{/* Section 4 - Callout */}
					<section className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-400">
						<h2 className="text-lg font-bold text-amber-900 mb-2">
							Data Deletion & Your Rights
						</h2>
						<p className="text-amber-800 text-sm">
							Under PIPEDA (Canada), you may request access to or deletion of your data.
							Please note that certain financial records must be retained for 6-7 years as
							per CRA regulations. To request data deletion, contact us at the details
							below.
						</p>
					</section>

					{/* Section 5 */}
					<section className="pt-8 border-t border-slate-100">
						<h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
							Contact Information
						</h2>
						<div className="flex flex-col items-center justify-center space-y-2">
							<p className="text-slate-600">
								For privacy inquiries, please contact our Data Officer:
							</p>
							<a
								href={`https://${websiteUrl}`}
								className="text-blue-600 font-bold hover:text-blue-800 transition-colors"
							>
								{websiteUrl}
							</a>
						</div>
					</section>
				</div>

				<div className="bg-slate-50 py-6 px-8 text-center text-xs text-slate-400 uppercase tracking-widest">
					© 2026 {businessName}. Secure Professional Services.
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
