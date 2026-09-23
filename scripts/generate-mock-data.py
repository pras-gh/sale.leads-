"""Seeded, fictional mock data for src/data. Analytics are derived from leads so everything agrees."""
import json, random, datetime as dt
from collections import Counter, defaultdict
from pathlib import Path

random.seed(20260923)
OUT = Path(__file__).resolve().parent.parent / "src" / "data"
TODAY = dt.date(2026, 9, 23)

companies_src = [
    ("Brightfold Logistics", "Logistics", "201-500", "NA", "United States"),
    ("Kestrelline Analytics", "SaaS", "51-200", "NA", "Canada"),
    ("Orrin & Vale Health", "Healthcare", "501-1000", "EMEA", "United Kingdom"),
    ("Tessaract Payments", "Fintech", "51-200", "EMEA", "Germany"),
    ("Lumenwright Manufacturing", "Manufacturing", "1001-5000", "NA", "United States"),
    ("Cobaltreach Security", "Cybersecurity", "201-500", "APAC", "Singapore"),
    ("Pinegrove Retail Co.", "Retail", "1001-5000", "NA", "United States"),
    ("Halcyon Learning", "Education", "11-50", "EMEA", "Netherlands"),
    ("Marrowstone Media", "Media", "51-200", "APAC", "Australia"),
    ("Quillfeather Legal Tech", "SaaS", "11-50", "EMEA", "Ireland"),
    ("Driftwell Properties", "Real estate", "201-500", "NA", "United States"),
    ("Sableport Freight", "Logistics", "501-1000", "APAC", "Japan"),
    ("Veridian Grid Energy", "Energy", "1001-5000", "EMEA", "Spain"),
    ("Northcairn Robotics", "Manufacturing", "51-200", "NA", "United States"),
]
companies = []
for i, (name, industry, size, region, country) in enumerate(companies_src, 1):
    slug = "".join(c for c in name.lower().split()[0] if c.isalnum())
    companies.append({
        "id": f"cmp_{i:03d}", "name": name, "domain": f"{slug}.example", "industry": industry,
        "employees": size, "region": region, "country": country,
    })

first = ["Ava","Noah","Mia","Liam","Zoe","Ethan","Priya","Mateo","Hana","Omar","Lena","Kai","Sofia","Jonas","Amara","Theo",
         "Nia","Ravi","Elena","Felix","Yara","Owen","Ines","Arjun","Clara","Diego","Maya","Leo","Aisha","Hugo"]
last = ["Chen","Okafor","Lindqvist","Patel","Moreau","Tanaka","Silva","Novak","Haddad","Schmidt","Rossi","Kim","Adeyemi",
        "Larsen","Costa","Murphy","Ibrahim","Walsh","Fischer","Nakamura","Duarte","Kowalski","Mensah","Byrne"]
titles = ["VP of Sales","Head of Revenue Operations","Sales Director","Chief Revenue Officer","Head of Growth",
          "Sales Operations Manager","Director of Business Development","Account Executive","Head of Marketing","COO"]
sources = [("Website",24),("LinkedIn",22),("Referral",12),("Event",10),("Import",18),("Cold outbound",14)]
owners = ["Ava Chen","Marcus Reid","Sofia Duarte","Jonas Larsen"]
STAGES = ["new","contacted","qualified","proposal","won","lost"]

def wpick(pairs): return random.choices([p for p,_ in pairs],[w for _,w in pairs])[0]

def status_for(age):
    if age < 7:   w = [70,30,0,0,0,0]
    elif age < 21: w = [25,45,22,5,0,3]
    elif age < 45: w = [8,30,30,15,7,10]
    else:          w = [3,17,25,18,17,20]
    return random.choices(STAGES, w)[0]

score_range = {"new":(20,60),"contacted":(30,70),"qualified":(55,85),"proposal":(65,92),"won":(75,99),"lost":(15,55)}
leads, used = [], set()
for i in range(1, 121):
    while True:
        fn, ln = random.choice(first), random.choice(last)
        if (fn, ln) not in used: used.add((fn, ln)); break
    c = random.choice(companies)
    age = int(random.triangular(0, 105, 0))
    created = TODAY - dt.timedelta(days=age)
    status = status_for(age)
    last_touch = created + dt.timedelta(days=random.randint(0, max(0, age)))
    value = None
    if status in ("qualified","proposal","won","lost"):
        base = {"11-50":6,"51-200":14,"201-500":28,"501-1000":45,"1001-5000":80}[c["employees"]]
        value = int(round(base * random.uniform(0.6, 1.6), 0)) * 1000
    leads.append({
        "id": f"lead_{i:03d}", "firstName": fn, "lastName": ln, "title": random.choice(titles),
        "email": f"{fn.lower()}.{ln.lower()}@{c['domain']}", "companyId": c["id"],
        "source": wpick(sources), "status": status, "score": random.randint(*score_range[status]),
        "owner": random.choice(owners), "estimatedValue": value,
        "createdAt": created.isoformat(), "lastActivityAt": last_touch.isoformat(),
    })
leads.sort(key=lambda l: (l["createdAt"], l["lastName"]))
for n, l in enumerate(leads, 1):
    l["id"] = f"lead_{n:03d}"
leads.reverse()  # newest first

def funnel_campaign(audience, open_r, reply_r, meet_r):
    sent = audience
    opened = int(sent * open_r); replied = int(opened * reply_r); meetings = int(replied * meet_r)
    return {"audience": audience, "sent": sent, "opened": opened, "replied": replied, "meetingsBooked": meetings}

camp_src = [
    ("Q3 RevOps leaders — outbound", "email", "completed", "2026-07-06", "2026-08-28", 1200, .52, .11, .38),
    ("Logistics mid-market sequence", "multichannel", "active", "2026-08-18", None, 640, .58, .14, .41),
    ("Fintech founders — LinkedIn", "linkedin", "active", "2026-09-01", None, 380, .71, .19, .33),
    ("Event follow-up: supply chain summit", "email", "completed", "2026-06-15", "2026-07-10", 210, .66, .24, .45),
    ("Healthcare ops re-engagement", "email", "paused", "2026-08-04", None, 520, .41, .07, .30),
    ("EMEA expansion — Q4", "multichannel", "draft", "2026-10-05", None, 900, 0, 0, 0),
]
campaigns = []
for i, (name, ch, st, start, end, aud, o, r, m) in enumerate(camp_src, 1):
    stats = funnel_campaign(aud, o, r, m)
    if st == "draft": stats.update(sent=0, opened=0, replied=0, meetingsBooked=0)
    if st in ("active","paused"):  # partway through the audience
        frac = random.uniform(.45, .8)
        stats = funnel_campaign(aud, o, r, m) | {"sent": int(aud * frac)}
        stats["opened"] = int(stats["sent"] * o); stats["replied"] = int(stats["opened"] * r); stats["meetingsBooked"] = int(stats["replied"] * m)
    campaigns.append({"id": f"camp_{i:03d}", "name": name, "channel": ch, "status": st, "owner": random.choice(owners),
                      "startDate": start, "endDate": end, **stats})

# --- analytics, all derived
# Twelve full weeks, ending the Sunday before TODAY (a partial week would read as a dip).
this_monday = TODAY - dt.timedelta(days=TODAY.weekday())
week0 = this_monday - dt.timedelta(weeks=12)
weekly = []
for w in range(12):
    ws = week0 + dt.timedelta(weeks=w); we = ws + dt.timedelta(days=7)
    batch = [l for l in leads if ws <= dt.date.fromisoformat(l["createdAt"]) < we]
    weekly.append({"weekStart": ws.isoformat(), "leads": len(batch),
                   "qualified": sum(l["status"] in ("qualified","proposal","won") for l in batch),
                   "won": sum(l["status"] == "won" for l in batch)})
by_status = Counter(l["status"] for l in leads)
reached = lambda stages: sum(by_status[s] for s in stages)
funnel = [
    {"stage": "Leads", "count": len(leads)},
    {"stage": "Contacted", "count": reached(["contacted","qualified","proposal","won","lost"])},
    {"stage": "Qualified", "count": reached(["qualified","proposal","won"])},
    {"stage": "Proposal", "count": reached(["proposal","won"])},
    {"stage": "Won", "count": by_status["won"]},
]
src_rows = defaultdict(lambda: {"leads":0,"qualified":0,"won":0})
for l in leads:
    r = src_rows[l["source"]]; r["leads"] += 1
    r["qualified"] += l["status"] in ("qualified","proposal","won"); r["won"] += l["status"] == "won"
by_source = sorted(({"source": k, **v} for k, v in src_rows.items()), key=lambda r: -r["leads"])
own_rows = defaultdict(lambda: {"leads":0,"won":0,"pipelineValue":0})
for l in leads:
    r = own_rows[l["owner"]]; r["leads"] += 1; r["won"] += l["status"] == "won"
    if l["status"] in ("qualified","proposal"): r["pipelineValue"] += l["estimatedValue"] or 0
by_owner = sorted(({"owner": k, **v} for k, v in own_rows.items()), key=lambda r: -r["pipelineValue"])
won, lost = by_status["won"], by_status["lost"]
analytics = {
    "_note": "Mock data. Every figure is derived from leads.json and campaigns.json.",
    "generatedAt": TODAY.isoformat(),
    "weeklyRange": {"from": weekly[0]["weekStart"], "to": (this_monday - dt.timedelta(days=1)).isoformat()},
    "kpis": {
        "totalLeads": len(leads),
        "qualifiedLeads": funnel[2]["count"],
        "pipelineValue": sum(l["estimatedValue"] or 0 for l in leads if l["status"] in ("qualified","proposal")),
        "wonValue": sum(l["estimatedValue"] or 0 for l in leads if l["status"] == "won"),
        "winRate": round(won / (won + lost), 3) if won + lost else 0,
        "meetingsBooked": sum(c["meetingsBooked"] for c in campaigns),
        "avgLeadScore": round(sum(l["score"] for l in leads) / len(leads), 1),
    },
    "weekly": weekly, "funnel": funnel, "bySource": by_source, "byOwner": by_owner,
    "byStatus": [{"status": s, "count": by_status[s]} for s in STAGES],
}

for name, data in [("companies", companies), ("leads", leads), ("campaigns", campaigns), ("analytics", analytics)]:
    (OUT / f"{name}.json").write_text(json.dumps(data, indent=2) + "\n")
print({k: len(v) for k, v in [("companies", companies), ("leads", leads), ("campaigns", campaigns)]}, analytics["kpis"])
print("funnel", [f["count"] for f in funnel]); print("weekly", [w["leads"] for w in weekly])
