(def input-strings
  (->> (slurp "answers/inputs/day05.txt")
       clojure.string/split-lines))

(defn has-doubles? [s]
  (not-every? #(= (count %) 1) (partition-by identity s)))

(defn has-3-vowels? [s]
  (> (count (re-seq #"[aeiou]" s)) 2))

(defn is-clean? [s]
  (= 0 (count (filter #(.contains s %) ["ab" "cd" "pq" "xy"]))))

(defn has-repeated-pair? [s]
  (re-seq #"(..).*\1" s))

(defn has-separated-pair? [s]
  (re-seq #"(.).\1" s))

(defn is-nice-1? [s]
  (and (has-doubles? s) (has-3-vowels? s) (is-clean? s)))

(defn is-nice-2? [s]
  (and (has-repeated-pair? s) (has-separated-pair? s)))

;;part 1
(count (filter is-nice-1? input-strings))

;;part 2
(count (filter is-nice-2? input-strings))

