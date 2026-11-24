// Questions fréquentes : source unique pour la page et pour les données structurées (Google exige qu'elles soient identiques)
export interface FaqItem {
  q: string;
  a: string;
}

export const faqFr: FaqItem[] = [
  {
    q: "Peut-on faire du cheval dans le parc du Château de Versailles ?",
    a: "Oui. Versailles à Cheval propose une balade privée de 2 heures à l'intérieur du parc du Château de Versailles, jusqu'au Grand Canal, accompagnée d'un guide. Les billets d'accès au Château sont inclus et les débutants sont les bienvenus.",
  },
  {
    q: "Dois-je savoir monter à cheval pour faire une balade à Versailles ?",
    a: "Non. Aucune expérience équestre n'est requise. Nos chevaux sont spécialement entraînés pour accueillir des débutants. Un briefing de sécurité complet et une présentation individuelle avec votre cheval sont effectués avant chaque balade.",
  },
  {
    q: "Combien de temps dure la balade à cheval à Versailles ?",
    a: "La balade à cheval dure 2 heures. La durée totale dépend des options choisies : avec la visite guidée du Château (1h30), le déjeuner et le domaine de Trianon, comptez la journée entière.",
  },
  {
    q: "Les enfants peuvent-ils participer à la balade ?",
    a: "Oui, à partir de 8 ans. Les enfants montent sur Marquise, notre jument la plus douce. Pour les plus jeunes (5-7 ans), des balades en main accompagnées sont disponibles en option.",
  },
  {
    q: "Que se passe-t-il en cas de mauvais temps ?",
    a: "Nous sortons par tous les temps, sauf vent violent ou orage électrique. En cas d'annulation météo de notre fait, vous avez le choix entre un remboursement complet ou un report sans frais.",
  },
  {
    q: "Les tickets d'accès au Château sont-ils inclus ?",
    a: "Oui. L'Expérience Royale Complète inclut les tickets d'entrée aux jardins et au Château de Versailles. Pas besoin de faire la queue — vos tickets sont prépayés et disponibles à l'accueil.",
  },
  {
    q: "Comment se rendre aux écuries depuis Paris ?",
    a: "Les écuries sont accessibles en RER C (gare Versailles-Rive-Gauche, 40 min depuis Paris). Nous proposons également un service de transport privé depuis votre hôtel parisien.",
  },
  {
    q: "Combien coûte une balade à cheval à Versailles ?",
    a: "L'Expérience Royale Complète est proposée à partir de 550€ par personne : 2 heures de balade privée et billets d'accès au Château inclus. En option : visite guidée privée du Château (120€ pour une personne, 240€ pour le groupe), déjeuner (100€ ou 200€ par personne), transport privé depuis votre hôtel parisien (200€ à 300€).",
  },
  {
    q: "Comment réserver ?",
    a: "La réservation se fait en ligne sur ce site : choisissez votre date, le nombre de participants et vos options, puis réglez par paiement sécurisé. Nous vous recontactons ensuite par WhatsApp pour organiser votre venue. Annulation gratuite jusqu'à 48h avant l'expérience.",
  },
];

export const faqEn: FaqItem[] = [
  {
    q: "Can you ride a horse in the park of the Palace of Versailles?",
    a: "Yes. Versailles à Cheval offers a private 2-hour ride inside the park of the Palace of Versailles, all the way to the Grand Canal, accompanied by a guide. Palace access tickets are included and beginners are welcome.",
  },
  {
    q: "Do I need horse riding experience for the Versailles ride?",
    a: "No. No equestrian experience is required. Our horses are specially trained to welcome beginners. A full safety briefing and individual introduction with your horse are carried out before every ride.",
  },
  {
    q: "How long does the horse ride in Versailles last?",
    a: "The horseback ride lasts 2 hours. The total duration depends on the options you choose: with the guided Palace tour (1.5 hours), lunch and the Trianon estate, plan a full day.",
  },
  {
    q: "Can children join the horse ride?",
    a: "Yes, from age 8. Children ride on Marquise, our gentlest mare. For younger children (5-7 years), led walks alongside a handler are available as an option.",
  },
  {
    q: "What happens in bad weather?",
    a: "We ride in all weather except strong winds or electrical storms. If we cancel for weather reasons, you can choose a full refund or a free rescheduling.",
  },
  {
    q: "Are Château tickets included?",
    a: "Yes. The Complete Royal Experience includes entry tickets to both the gardens and the Château de Versailles. No queue — your tickets are prepaid and ready at reception.",
  },
  {
    q: "How do I get to the stables from Paris?",
    a: "The stables are accessible by RER C (Versailles-Rive-Gauche station, 40 minutes from Paris). We also offer private transport from your Parisian hotel.",
  },
  {
    q: "How much does a horseback ride in Versailles cost?",
    a: "The Complete Royal Experience starts at €550 per person: a private 2-hour ride and Palace access tickets included. Options: private guided tour of the Palace (€120 for one person, €240 for the group), lunch (€100 or €200 per person), private transfer from your Paris hotel (€200 to €300).",
  },
  {
    q: "How do I book?",
    a: "Book online on this site: choose your date, the number of riders and your options, then pay securely. We then contact you on WhatsApp to organise your visit. Free cancellation up to 48 hours before the experience.",
  },
];
